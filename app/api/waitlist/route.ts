import { supabase } from "@/lib/supabase/server";
import {
	type WaitlistInsert,
	waitlistSchema,
} from "@/lib/validations/waitlist";
import { checkRateLimit } from "@/lib/check-rate-limit";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function errorResponse(message: string, status: number) {
	return NextResponse.json({ success: false, error: message }, { status });
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

		// 3. Validate request data
		const parsed = waitlistSchema.safeParse(body);

		if (!parsed.success) {
			return errorResponse(
				parsed.error.issues[0]?.message ??
					"Los datos introducidos no son válidos.",
				400
			);
		}

		// 4. Prepare database record
		const { user_name, user_last_name, user_email } = parsed.data;

		const insertData = {
			user_name,
			user_last_name,
			user_email,
			privacy_accepted_at: new Date().toISOString(),
		} satisfies WaitlistInsert;

		// 5. Insert into Supabase
		const { error } = await supabase.from("waitlist").insert(insertData);

		if (error && error.code !== "23505") {
			console.error("Waitlist insertion error:", {
				code: error.code,
			});

			return errorResponse(
				"No hemos podido completar tu registro. Inténtalo de nuevo.",
				500
			);
		}

		// 6. Same response for new and existing emails
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Waitlist API error:", error);

		return errorResponse(
			"Ha ocurrido un error inesperado. Inténtalo de nuevo.",
			500
		);
	}
}
