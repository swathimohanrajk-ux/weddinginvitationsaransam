
CREATE TABLE public.rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_count INTEGER NOT NULL CHECK (guest_count >= 1 AND guest_count <= 10),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an RSVP
CREATE POLICY "Anyone can insert RSVPs"
ON public.rsvps
FOR INSERT
TO anon, authenticated
WITH CHECK (guest_count >= 1 AND guest_count <= 10);

-- Anyone can read RSVPs (needed to compute the public total)
CREATE POLICY "Anyone can view RSVPs"
ON public.rsvps
FOR SELECT
TO anon, authenticated
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.rsvps;
ALTER TABLE public.rsvps REPLICA IDENTITY FULL;
