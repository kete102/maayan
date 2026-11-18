import { NextResponse } from "next/server";

import { getSupabase } from "@/lib/supabase/server";
import { waitlistSchema } from "@/lib/validations/waitlist";
import { checkRateLimit } from "@/lib/check-rate-limit";
import { processWaitlistEmail } from "@/lib/email/process-waitlist-email";

export const runtime = "nodejs";

type RegistrationResult =
	| { status: "created"; code: string }
	| { status: "existing" }
	| { status: "full" };

function errorResponse(message: string, status: number) {
	return NextResponse.json({ success: false, error: message }, { status });
}

function isRegistrationResult(value: unknown): value is RegistrationResult {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	if (!("status" in value)) {
		return false;
	}

	if (value.status === "existing" || value.status === "full") {
		return true;
	}

	return (
		value.status === "created" &&
		"code" in value &&
		typeof value.code === "string" &&
		value.code.length > 0
	);
}

export async function POST(request: Request) {
	try {
		// 1. Rate limiting
		const rateLimitResponse = await checkRateLimit(request);

		if (rateLimitResponse) {
			return rateLimitResponse;
		}

		// 2. Parse request body
		let body: unknown;

		try {
			body = await request.json();
		} catch {
			return errorResponse("El formato de la solicitud no es válido.", 400);
		}

		// 3. Validate input
		const parsed = waitlistSchema.safeParse(body);

		if (!parsed.success) {
			return errorResponse(
				parsed.error.issues[0]?.message ??
					"Los datos introducidos no son válidos.",
				400
			);
		}

		const { user_name, user_last_name, user_email } = parsed.data;

		const supabase = getSupabase();

		// 4. Register user and generate discount code
		const { data, error } = await supabase.rpc("register_waitlist", {
			p_name: user_name,
			p_last_name: user_last_name,
			p_email: user_email,
		});

		if (error) {
			console.error("Waitlist registration error:", {
				code: error.code,
				message: error.message,
			});

			return errorResponse(
				"No hemos podido completar tu registro. Inténtalo de nuevo.",
				500
			);
		}

		if (!isRegistrationResult(data)) {
			console.error("Unexpected waitlist RPC response");

			return errorResponse(
				"No hemos podido completar tu registro. Inténtalo de nuevo.",
				500
			);
		}

		// 5. Waitlist full
		if (data.status === "full") {
			return errorResponse(
				"Nuestra primera lista de espera ya está completa.",
				409
			);
		}

		// 6. Already registered
		// Don't generate another code or send another email.
		if (data.status === "existing") {
			return NextResponse.json({ success: true }, { status: 200 });
		}

		// 7. New registration: process confirmation email
		// The registration is already saved in Supabase.
		// If email processing fails, the cron can retry later.
		try {
			const emailResult = await processWaitlistEmail(user_email);

			if (emailResult === "failed") {
				console.warn("Waitlist confirmation email queued for retry");
			}

			if (emailResult === "none") {
				console.warn("Waitlist confirmation email was not claimed");
			}
		} catch (emailError) {
			console.error("Initial waitlist email processing failed:", emailError);
		}

		// 8. Success
		// Registration succeeded regardless of email delivery.
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Waitlist API error:", error);

		return errorResponse(
			"Ha ocurrido un error inesperado. Inténtalo de nuevo.",
			500
		);
	}
}
