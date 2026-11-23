ALTER TABLE public.waitlist_applications
  ADD COLUMN IF NOT EXISTS sex_reason text,
  ADD COLUMN IF NOT EXISTS care_costs text,
  ADD COLUMN IF NOT EXISTS pet_sitter text,
  ADD COLUMN IF NOT EXISTS pedigree_why text,
  ADD COLUMN IF NOT EXISTS contract_aware boolean,
  ADD COLUMN IF NOT EXISTS keep_contact boolean;
ALTER TABLE public.waitlist_applications
  ADD CONSTRAINT waitlist_extra_lengths CHECK (
    coalesce(char_length(sex_reason), 0) <= 1000
    AND coalesce(char_length(care_costs), 0) <= 1500
    AND coalesce(char_length(pet_sitter), 0) <= 1000
    AND coalesce(char_length(pedigree_why), 0) <= 1500
  );