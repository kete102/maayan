"use client";

import { useEffect, useState } from "react";
import { LAUNCH_AT } from "@/lib/launch";
import { cn } from "@/lib/utils";

type TimeLeft = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
	const diff = target.getTime() - Date.now();
	if (diff <= 0) return null;
	const totalSeconds = Math.floor(diff / 1000);
	return {
		days: Math.floor(totalSeconds / 86_400),
		hours: Math.floor((totalSeconds % 86_400) / 3_600),
		minutes: Math.floor((totalSeconds % 3_600) / 60),
		seconds: totalSeconds % 60,
	};
}

const units = [
	{ key: "days", label: "Días" },
	{ key: "hours", label: "Horas" },
	{ key: "minutes", label: "Minutos" },
	{ key: "seconds", label: "Segundos" },
] as const;

export function Countdown({ className }: { className?: string }) {
	// Undefined until mounted so server and client render the same markup.
	const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(
		undefined
	);

	useEffect(() => {
		const tick = () => setTimeLeft(getTimeLeft(LAUNCH_AT));
		tick();
		const id = window.setInterval(tick, 1000);
		return () => window.clearInterval(id);
	}, []);

	if (timeLeft === null) {
		return (
			<p className={cn("type-overline text-foreground", className)}>
				Ya disponible
			</p>
		);
	}

	return (
		<div
			className={cn("flex flex-col items-center gap-4", className)}
			role="timer"
			aria-label="Cuenta atrás hasta el 1 de diciembre a las 9:00"
		>
			<p className="type-overline text-foreground/80">
				Origen · 1 de diciembre
			</p>
			<dl className="flex items-start justify-center gap-3 sm:gap-10">
				{units.map(({ key, label }, index) => (
					<div
						key={key}
						className="flex items-start gap-3 sm:gap-10"
					>
						{index > 0 && (
							<span
								className="bg-foreground/25 mt-4 h-8 w-px sm:mt-5 sm:h-10"
								aria-hidden="true"
							/>
						)}
						<div className="flex min-w-[3ch] flex-col-reverse items-center">
							<dt className="type-overline text-foreground/70 mt-3 text-[0.625rem] tracking-[0.1em] sm:text-sm sm:tracking-[0.15em]">
								{label}
							</dt>
							<dd
								className="font-serif text-4xl lining-nums tabular-nums sm:text-6xl"
								aria-live="off"
							>
								{timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
							</dd>
						</div>
					</div>
				))}
			</dl>
		</div>
	);
}
