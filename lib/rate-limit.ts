"server only";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

export const waitlistRateLimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(5, "1 h"),
	prefix: "maayan:waitlist",
	analytics: false,
});
