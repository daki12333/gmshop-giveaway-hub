-- Reduce default max participants for giveaways
ALTER TABLE public.giveaways 
ALTER COLUMN max_participants SET DEFAULT 100;