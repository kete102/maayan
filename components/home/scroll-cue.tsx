"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function ScrollCue({ href, label }: { href: string; label: string }) {
	const reduceMotion = useReducedMotion();

	return (
		<a
			href={href}
			className="text-foreground/70 hover:text-foreground absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 px-8 py-3 transition-colors"
		>
			<span className="type-overline text-sm">{label}</span>
			<motion.span
				aria-hidden="true"
				animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
				transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
			>
				<ChevronDown
					className="size-5"
					strokeWidth={1.5}
				/>
			</motion.span>
		</a>
	);
}
