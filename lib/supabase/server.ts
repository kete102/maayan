import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

const REQUEST_TIMEOUT_MS = 5000;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
	throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseSecretKey) {
	throw new Error("Missing SUPABASE_SECRET_KEY");
}

function fetchWithTimeout(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> {
	const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);

	const signal = init?.signal
		? AbortSignal.any([init.signal, timeout])
		: timeout;

	return fetch(input, {
		...init,
		signal,
	});
}

export const supabase = createClient<Database>(supabaseUrl, supabaseSecretKey, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
		detectSessionInUrl: false,
	},
	global: {
		fetch: fetchWithTimeout,
	},
});
