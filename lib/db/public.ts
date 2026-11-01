import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

const REQUEST_TIMEOUT_MS = 5000;

function fetchWithTimeout(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<Response> {
	const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
	const signal = init?.signal
		? AbortSignal.any([init.signal, timeout])
		: timeout;

	return fetch(input, { ...init, signal });
}

export function createPublicSupabaseClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey =
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl) {
		throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
	}

	if (!supabaseKey) {
		throw new Error(
			"Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or legacy NEXT_PUBLIC_SUPABASE_ANON_KEY)"
		);
	}

	return createClient<Database>(supabaseUrl, supabaseKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
		global: {
			fetch: fetchWithTimeout,
		},
	});
}
