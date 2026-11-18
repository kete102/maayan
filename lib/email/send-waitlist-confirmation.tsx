import "server-only";

import { Resend } from "resend";
import WaitlistConfirmationEmail from "@/components/emails/waitlist-confirmation";

type SendConfirmationParams = {
	name: string;
	email: string;
	discountCode: string;
};

export async function sendWaitlistConfirmation({
	name,
	email,
	discountCode,
}: SendConfirmationParams) {
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.MAAYAN_EMAIL_FROM;

	if (!apiKey || !from) {
		throw new Error("Missing email configuration");
	}

	const resend = new Resend(apiKey);

	const { data, error } = await resend.emails.send(
		{
			from,
			to: email,
			subject: "Ya formas parte del comienzo · MAAYAN",
			react: (
				<WaitlistConfirmationEmail
					name={name}
					discountCode={discountCode}
				/>
			),
		},
		{
			idempotencyKey: `waitlist/${discountCode}`,
		}
	);

	if (error) {
		throw new Error(`Resend error: ${error.name}`);
	}

	return data;
}
