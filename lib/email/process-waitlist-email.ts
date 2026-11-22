import "server-only";

import { getSupabase } from "@/lib/supabase/server";
import { sendWaitlistConfirmation } from "./send-waitlist-confirmation";

type ClaimedEmail = {
	email: string;
	name: string;
	code: string | null;
	expiresAt: string | null;
	token: string;
};

function isClaimedEmail(value: unknown): value is ClaimedEmail {
	if (!value || typeof value !== "object") {
		return false;
	}

	const record = value as Record<string, unknown>;

	return (
		typeof record.email === "string" &&
		typeof record.name === "string" &&
		(record.code === null || typeof record.code === "string") &&
		(record.expiresAt === null || typeof record.expiresAt === "string") &&
		typeof record.token === "string"
	);
}

export async function processWaitlistEmail(
	email?: string
): Promise<"none" | "sent" | "failed"> {
	const supabase = getSupabase();

	const { data, error } = await supabase.rpc("claim_waitlist_email", {
		p_email: email ?? undefined,
	});

	if (error) {
		throw new Error(`Claim failed: ${error.code}`);
	}

	if (data === null) {
		return "none";
	}

	if (!isClaimedEmail(data)) {
		throw new Error("Invalid email claim response");
	}

	let success = false;

	try {
		await sendWaitlistConfirmation({
			name: data.name,
			email: data.email,
			discountCode: data.code,
			discountExpiresAt: data.expiresAt,
		});

		success = true;
	} catch (error) {
		console.error("Waitlist email delivery request failed:", error);
	}

	const { data: finalized, error: finishError } = await supabase.rpc(
		"finish_waitlist_email",
		{
			p_email: data.email,
			p_token: data.token,
			p_success: success,
		}
	);

	if (finishError || finalized !== true) {
		throw new Error("Could not finalize email attempt");
	}

	return success ? "sent" : "failed";
}
