CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.claim_admin_role()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _email text;
BEGIN
  SELECT email INTO _email FROM auth.users WHERE id = auth.uid();
  IF _email IS NULL OR lower(_email) <> 'kalapattiveeran@gmail.com' THEN
    RETURN false;
  END IF;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (auth.uid(), 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_admin_role() TO authenticated;

-- Guest wishes: public may post, only admin may read
DROP POLICY IF EXISTS "Anyone can view wishes" ON public.guest_wishes;
CREATE POLICY "Only admins can view wishes"
  ON public.guest_wishes FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

REVOKE SELECT ON public.guest_wishes FROM anon;
GRANT INSERT ON public.guest_wishes TO anon;
GRANT SELECT, INSERT ON public.guest_wishes TO authenticated;
GRANT ALL ON public.guest_wishes TO service_role;

-- RSVPs: public may submit, only admin may read
DROP POLICY IF EXISTS "Anyone can view RSVPs" ON public.rsvps;
CREATE POLICY "Only admins can view RSVPs"
  ON public.rsvps FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

REVOKE SELECT ON public.rsvps FROM anon;
GRANT INSERT ON public.rsvps TO anon;
GRANT SELECT, INSERT ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;