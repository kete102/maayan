"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

export function HeroVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [paused, setPaused] = useState(false);

	function toggle() {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			void video.play();
			setPaused(false);
		} else {
			video.pause();
			setPaused(true);
		}
	}

	return (
		<>
			<video
				ref={videoRef}
				src="/hero-video.mp4"
				poster="/hero-poster.jpg"
				autoPlay
				loop
				muted
				playsInline
				preload="metadata"
				aria-hidden="true"
				className="absolute inset-0 -z-20 size-full scale-105 object-cover blur-[1px] motion-reduce:hidden"
			/>
			{/* WCAG 2.2.2: moving content longer than 5s must be pausable. */}
			<button
				type="button"
				onClick={toggle}
				aria-label={
					paused ? "Reproducir vídeo de fondo" : "Pausar vídeo de fondo"
				}
				className="text-foreground/60 hover:text-foreground focus-visible:ring-ring size-touch-target rounded-pill absolute right-4 bottom-6 z-10 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none motion-reduce:hidden"
			>
				{paused ? (
					<Play
						className="size-4"
						strokeWidth={1.5}
						aria-hidden="true"
					/>
				) : (
					<Pause
						className="size-4"
						strokeWidth={1.5}
						aria-hidden="true"
					/>
				)}
			</button>
		</>
	);
}
