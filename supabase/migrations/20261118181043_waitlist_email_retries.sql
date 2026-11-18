
ALTER TABLE public.waitlist
  DROP CONSTRAINT IF EXISTS
    waitlist_confirmation_email_status_check;

ALTER TABLE public.waitlist
  ADD CONSTRAINT
    waitlist_confirmation_email_status_check
  CHECK (
    confirmation_email_status IN (
      'pending',
      'processing',
      'sent',
      'failed'
    )
  );

ALTER TABLE public.waitlist
  ADD COLUMN confirmation_email_attempts integer
    NOT NULL DEFAULT 0,
  ADD COLUMN confirmation_email_next_retry_at timestamptz
    NOT NULL DEFAULT now(),
  ADD COLUMN confirmation_email_locked_until timestamptz,
  ADD COLUMN confirmation_email_claim_token uuid;

