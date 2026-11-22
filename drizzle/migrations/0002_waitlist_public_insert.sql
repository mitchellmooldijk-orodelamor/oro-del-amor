GRANT INSERT ON public.waitlist_applications TO anon, authenticated;
GRANT ALL ON public.waitlist_applications TO service_role;
ALTER TABLE public.waitlist_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Visitors can submit a waitlist application" ON public.waitlist_applications;
CREATE POLICY "Visitors can submit a waitlist application"
ON public.waitlist_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent = true
  AND status = 'nieuw'
  AND char_length(full_name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 200
  AND char_length(city) BETWEEN 1 AND 100
  AND char_length(household) BETWEEN 1 AND 500
  AND char_length(motivation) BETWEEN 1 AND 2000
  AND char_length(housing) <= 50
  AND char_length(hours_alone) <= 50
  AND char_length(experience) <= 60
  AND char_length(sex_preference) <= 30
  AND coalesce(char_length(phone), 0) <= 30
  AND coalesce(char_length(other_pets), 0) <= 300
  AND coalesce(char_length(daily_rhythm), 0) <= 800
  AND coalesce(char_length(color_preference), 0) <= 100
  AND coalesce(char_length(timeframe), 0) <= 100
);