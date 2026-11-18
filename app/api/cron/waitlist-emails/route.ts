import { NextResponse } from "next/server";
import { processWaitlistEmail } from "@/lib/email/process-waitlist-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	const secret = process.env.CRON_SECRET;

	if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	let sent = 0;
	let failed = 0;

	try {
		// Procesar un lote pequeño por ejecución
		for (let i = 0; i < 10; i++) {
			const result = await processWaitlistEmail();

			if (result === "none") {
				break;
			}

			if (result === "sent") {
				sent++;
			} else {
				failed++;
			}
		}

		return NextResponse.json({
			success: true,
			sent,
			failed,
		});
	} catch (error) {
		console.error("Waitlist cron error:", error);

		return NextResponse.json({ success: false }, { status: 500 });
	}
}
