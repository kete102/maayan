-- The waitlist is accessed only through service-role RPCs. Keep the table
-- inaccessible to public Data API roles, including during future migrations.
REVOKE ALL ON TABLE public.waitlist FROM anon, authenticated;
REVOKE ALL ON SEQUENCE public.waitlist_id_seq FROM anon, authenticated;

-- Preserve the exact time at which privacy consent was recorded.
ALTER TABLE public.waitlist
  ALTER COLUMN privacy_accepted_at TYPE timestamptz
  USING privacy_accepted_at::timestamptz;
