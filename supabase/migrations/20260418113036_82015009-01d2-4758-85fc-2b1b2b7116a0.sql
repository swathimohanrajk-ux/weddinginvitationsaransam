CREATE TABLE public.guest_wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.guest_wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view wishes"
ON public.guest_wishes
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can post wishes"
ON public.guest_wishes
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(guest_name) BETWEEN 1 AND 80
  AND char_length(message) BETWEEN 1 AND 500
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.guest_wishes;
ALTER TABLE public.guest_wishes REPLICA IDENTITY FULL;