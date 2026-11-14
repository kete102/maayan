"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Reveal with a per-item delay, for staggered reading rhythm. */
export function RevealItem({
	children,
	className,
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className={className}
			initial={reduceMotion ? false : { opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.4 }}
			transition={{ duration: 0.8, delay, ease: [0.2, 0.75, 0.25, 1] }}
		>
			{children}
		</motion.div>
	);
}
