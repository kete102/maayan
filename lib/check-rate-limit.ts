import "server-only";

import { createHmac } from "node:crypto";
import { getRequestIp } from "@/lib/request-ip";

export async function checkRateLimit(
	request: Request
): Promise<Response | null> {
	// Desactivar rate limiting en desarrollo local.
	if (process.env.NODE_ENV === "development") {
		return null;
	}

	const { waitlistRateLimit } = await import("@/lib/rate-limit");

	const ip = getRequestIp(request);

	if (!ip) {
		return Response.json(
			{
				code: "IP_UNAVAILABLE",
				error: "El registro no está disponible temporalmente.",
			},
			{ status: 503 }
		);
	}

	const secret = process.env.RATE_LIMIT_HASH_SECRET;

	if (!secret) {
		throw new Error("Missing RATE_LIMIT_HASH_SECRET");
	}

	const identifier = createHmac("sha256", secret).update(ip).digest("hex");

	try {
		const { success, reset } = await waitlistRateLimit.limit(identifier);

		if (!success) {
			return Response.json(
				{
					code: "RATE_LIMITED",
					error: "Has realizado demasiados intentos. Inténtalo más tarde.",
				},
				{
					status: 429,
					headers: {
						"Retry-After": String(
							Math.max(1, Math.ceil((reset - Date.now()) / 1000))
						),
					},
				}
			);
		}

		return null;
	} catch (error) {
		console.error("Rate limiting failed:", error);

		return Response.json(
			{
				code: "SERVICE_UNAVAILABLE",
				error: "El registro no está disponible temporalmente.",
			},
			{ status: 503 }
		);
	}
}
