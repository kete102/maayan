import "server-only";

import { Resend } from "resend";
import WaitlistConfirmationEmail from "@/components/emails/waitlist-confirmation";

type SendConfirmationParams = {
	name: string;
	email: string;
	discountCode: string | null;
	discountExpiresAt: string | null;
};

function formatDiscountExpiry(value: string): string {
	return new Intl.DateTimeFormat("es-ES", {
		dateStyle: "long",
		timeStyle: "short",
		timeZone: "Europe/Madrid",
	}).format(new Date(value));
}

export async function sendWaitlistConfirmation({
	name,
	email,
	discountCode,
	discountExpiresAt,
}: SendConfirmationParams) {
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.MAAYAN_EMAIL_FROM;

	if (!apiKey || !from) {
		throw new Error("Missing email configuration");
	}

	if (discountCode && !discountExpiresAt) {
		throw new Error("Missing discount expiry");
	}

	const resend = new Resend(apiKey);

	const { data, error } = await resend.emails.send(
		{
			from,
			to: email,
			subject: "Ya formas parte del ORIGEN · M A A Y A N",
			react: (
				<WaitlistConfirmationEmail
					name={name}
					discountCode={discountCode}
					discountExpiresAt={
						discountCode && discountExpiresAt
							? formatDiscountExpiry(discountExpiresAt)
							: null
					}
				/>
			),
		},
		{
			idempotencyKey: `waitlist/${discountCode ?? email}`,
		}
	);

	if (error) {
		throw new Error(`Resend error: ${error.name}`);
	}

	return data;
}
