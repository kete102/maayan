import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isLaunched } from "@/lib/launch";

/** Redirects to the landing until the store opens. Evaluated per request. */
export async function requireLaunched() {
	await connection();
	if (!isLaunched()) redirect("/");
}
