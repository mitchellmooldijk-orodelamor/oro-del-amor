CREATE TABLE public.waitlist_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text NOT NULL,
  housing text NOT NULL,
  has_garden boolean NOT NULL DEFAULT false,
  household text NOT NULL,
  other_pets text,
  hours_alone text NOT NULL,
  daily_rhythm text,
  experience text NOT NULL,
  sex_preference text NOT NULL DEFAULT 'geen voorkeur',
  color_preference text,
  timeframe text,
  motivation text NOT NULL,
  puppy_course boolean NOT NULL DEFAULT false,
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'nieuw'
);

GRANT ALL ON public.waitlist_applications TO service_role;

ALTER TABLE public.waitlist_applications ENABLE ROW LEVEL SECURITY;
-- Geen policies voor bezoekers: aanmeldingen worden alleen via de server opgeslagen en zijn niet openbaar leesbaar.