"server only";

import { ipAddress } from "@vercel/functions";

export function getRequestIp(request: Request): string | null {
	return ipAddress(request) ?? null;
}
