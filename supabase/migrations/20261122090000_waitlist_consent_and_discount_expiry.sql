SET local check_function_bodies = off;

ALTER TABLE public.waitlist
  ADD COLUMN commercial_communications_accepted_at timestamptz,
  ADD COLUMN discount_code_expires_at timestamptz;

-- Existing launch codes receive the same campaign expiry as new registrations.
UPDATE public.waitlist
SET discount_code_expires_at = timestamptz '2027-01-01 08:00:00+00'
WHERE discount_code_expires_at IS NULL;

ALTER TABLE public.waitlist
  ALTER COLUMN discount_code_expires_at SET NOT NULL;

CREATE OR REPLACE FUNCTION public.claim_waitlist_email(
  p_email text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_row public.waitlist%ROWTYPE;
  v_token uuid := gen_random_uuid();
BEGIN
  SELECT *
  INTO v_row
  FROM public.waitlist
  WHERE
    (p_email IS NULL OR user_email = p_email)
    AND discount_code IS NOT NULL
    AND confirmation_email_attempts < 5
    AND (
      (
        confirmation_email_status IN ('pending', 'failed')
        AND confirmation_email_next_retry_at <= now()
      )
      OR (
        confirmation_email_status = 'processing'
        AND confirmation_email_locked_until < now()
      )
    )
  ORDER BY confirmation_email_next_retry_at, id
  FOR UPDATE SKIP LOCKED
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  UPDATE public.waitlist
  SET
    confirmation_email_status = 'processing',
    confirmation_email_attempts = confirmation_email_attempts + 1,
    confirmation_email_claim_token = v_token,
    confirmation_email_locked_until = now() + interval '10 minutes'
  WHERE id = v_row.id;

  RETURN pg_catalog.jsonb_build_object(
    'email', v_row.user_email,
    'name', v_row.user_name,
    'code', v_row.discount_code,
    'expiresAt', v_row.discount_code_expires_at,
    'token', v_token
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.claim_waitlist_email(text)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.claim_waitlist_email(text)
TO service_role;

DROP FUNCTION public.register_waitlist(text, text, text);

CREATE FUNCTION public.register_waitlist (
  p_name text,
  p_last_name text,
  p_email text,
  p_commercial_communications_accepted boolean
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
DECLARE
  v_code text;
BEGIN
  PERFORM pg_catalog.pg_advisory_xact_lock(20261122, 50);

  IF EXISTS (
    SELECT 1
    FROM public.waitlist
    WHERE user_email = p_email
  ) THEN
    RETURN jsonb_build_object('status', 'existing');
  END IF;

  IF (
    SELECT count(*)
    FROM public.waitlist
  ) >= 50 THEN
    RETURN jsonb_build_object('status', 'full');
  END IF;

  v_code :=
    'MAAYAN-' ||
    upper(
      substr(
        replace(gen_random_uuid()::text, '-', ''),
        1,
        12
      )
    );

  INSERT INTO public.waitlist (
    user_name,
    user_last_name,
    user_email,
    privacy_accepted_at,
    commercial_communications_accepted_at,
    discount_code,
    discount_code_expires_at
  )
  VALUES (
    p_name,
    p_last_name,
    p_email,
    now(),
    CASE
      WHEN p_commercial_communications_accepted THEN now()
      ELSE NULL
    END,
    v_code,
    timestamptz '2027-01-01 08:00:00+00'
  );

  RETURN jsonb_build_object(
    'status', 'created',
    'code', v_code
  );
END;
$function$;

REVOKE ALL ON FUNCTION public.register_waitlist(text, text, text, boolean)
FROM PUBLIC, anon, authenticated, postgres;

GRANT EXECUTE ON FUNCTION public.register_waitlist(text, text, text, boolean)
TO service_role;
