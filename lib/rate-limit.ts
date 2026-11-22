import "server-only";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

const isProduction = process.env.VERCEL_ENV === "production";

export const waitlistRateLimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(isProduction ? 5 : 100, "1 h"),
	prefix: isProduction
		? "maayan:waitlist:production"
		: "maayan:waitlist:preview",
	analytics: false,
});
