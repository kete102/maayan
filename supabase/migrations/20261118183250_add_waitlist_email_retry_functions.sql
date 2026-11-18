
-- ============================================================
-- 1. CLAIM: reclamar un correo pendiente de envío o reintento
-- ============================================================

CREATE OR REPLACE FUNCTION public.claim_waitlist_email(
  p_email text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
    'token', v_token
  );
END;
$$;

-- Solo el backend con service_role puede ejecutar la función.
REVOKE ALL ON FUNCTION public.claim_waitlist_email(text)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.claim_waitlist_email(text)
TO service_role;


-- ============================================================
-- 2. FINISH: registrar el resultado del envío
-- ============================================================

CREATE OR REPLACE FUNCTION public.finish_waitlist_email(
  p_email text,
  p_token uuid,
  p_success boolean
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_updated integer;
BEGIN
  UPDATE public.waitlist
  SET
    confirmation_email_status = CASE
      WHEN p_success THEN 'sent'
      ELSE 'failed'
    END,

    confirmation_email_sent_at = CASE
      WHEN p_success THEN now()
      ELSE confirmation_email_sent_at
    END,

    confirmation_email_next_retry_at = CASE
      WHEN p_success THEN now()
      ELSE now() + (
        interval '15 minutes'
        * power(
            2,
            least(confirmation_email_attempts - 1, 4)
          )
      )
    END,

    confirmation_email_locked_until = NULL,
    confirmation_email_claim_token = NULL
  WHERE
    user_email = p_email
    AND confirmation_email_claim_token = p_token
    AND confirmation_email_status = 'processing';

  GET DIAGNOSTICS v_updated = ROW_COUNT;

  RETURN v_updated = 1;
END;
$$;

-- Solo el backend con service_role puede ejecutar la función.
REVOKE ALL ON FUNCTION public.finish_waitlist_email(text, uuid, boolean)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.finish_waitlist_email(text, uuid, boolean)
TO service_role;

