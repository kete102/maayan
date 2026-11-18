SET local check_function_bodies = off;

REVOKE ALL ON TABLE "public"."waitlist" FROM "anon";

REVOKE ALL ON TABLE "public"."waitlist" FROM "authenticated";

ALTER TABLE "public"."waitlist"
  ADD COLUMN "discount_code" text;

ALTER TABLE "public"."waitlist"
  ADD COLUMN "confirmation_email_status" text NOT NULL DEFAULT 'pending'::text;

ALTER TABLE "public"."waitlist"
  ADD COLUMN "confirmation_email_sent_at" timestamp WITH time zone;

CREATE OR REPLACE FUNCTION public.register_waitlist (
  p_name      text,
  p_last_name text,
  p_email     text
)
  RETURNS jsonb
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
DECLARE
  v_existing_code text;
  v_code text;
BEGIN
  -- Serializar las inscripciones concurrentes
  PERFORM pg_catalog.pg_advisory_xact_lock(20261122, 50);

  -- Comprobar si ya existe
  SELECT discount_code
  INTO v_existing_code
  FROM public.waitlist
  WHERE user_email = p_email;

  IF FOUND THEN
    RETURN jsonb_build_object(
      'status', 'existing'
    );
  END IF;

  -- Comprobar cupo
  IF (
    SELECT count(*)
    FROM public.waitlist
  ) >= 50 THEN
    RETURN jsonb_build_object(
      'status', 'full'
    );
  END IF;

  -- Generar código aleatorio
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
    discount_code
  )
  VALUES (
    p_name,
    p_last_name,
    p_email,
    now(),
    v_code
  );

  RETURN jsonb_build_object(
    'status', 'created',
    'code', v_code
  );
END;
$function$;

REVOKE ALL ON FUNCTION "public"."register_waitlist"(text, text, text) FROM PUBLIC, "anon", "authenticated";

ALTER TABLE "public"."waitlist"
  ADD CONSTRAINT "waitlist_confirmation_email_status_check" CHECK ((confirmation_email_status = ANY (ARRAY['pending'::text, 'sent'::text, 'failed'::text])));

ALTER TABLE "public"."waitlist"
  ADD CONSTRAINT "waitlist_discount_code_key" UNIQUE (discount_code);

REVOKE ALL ON FUNCTION "public"."register_waitlist"(text, text, text) FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."register_waitlist"(text, text, text) TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."register_waitlist"(text, text, text) TO "service_role";
