import { z } from "zod";
import type { Database } from "../database.types";

export type WaitlistInsert = Database["public"]["Tables"]["waitlist"]["Insert"];

export const waitlistSchema = z.object({
	user_name: z.string().trim().min(1).max(100),
	user_last_name: z.string().trim().min(1).max(150),
	user_email: z
		.string()
		.trim()
		.toLowerCase()
		.pipe(z.email("Introduce un correo electrónico válido.").max(254)),
	privacy_accepted_at: z.literal(true),
	commercial_communications_accepted: z.boolean(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistData = Pick<
	WaitlistInsert,
	"user_name" | "user_last_name" | "user_email"
>;
