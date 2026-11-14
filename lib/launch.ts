/** Store opening: 1 December 2026, 09:00 Spain (CET, UTC+1). */
export const LAUNCH_AT = new Date("2026-12-01T09:00:00+01:00");

export const INSTAGRAM_URL = "https://www.instagram.com/maayan.shop";
export const TIKTOK_URL = "https://www.tiktok.com/@maayan.shop";

export function isLaunched(now: Date = new Date()): boolean {
	return now.getTime() >= LAUNCH_AT.getTime();
}
