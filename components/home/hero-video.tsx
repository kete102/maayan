"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		let retryTimeout: ReturnType<typeof setTimeout> | undefined;

		const play = () => {
			video.muted = true;
			void video.play().catch(() => {
				// Autoplay can still be deferred by the browser until media is ready.
			});
		};

		const retry = () => {
			if (retryTimeout !== undefined) return;

			retryTimeout = setTimeout(() => {
				retryTimeout = undefined;
				play();
			}, 250);
		};

		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") play();
		};

		video.addEventListener("canplay", play);
		video.addEventListener("loadeddata", play);
		video.addEventListener("stalled", retry);
		video.addEventListener("waiting", retry);
		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("pageshow", play);
		play();

		return () => {
			if (retryTimeout !== undefined) clearTimeout(retryTimeout);
			video.removeEventListener("canplay", play);
			video.removeEventListener("loadeddata", play);
			video.removeEventListener("stalled", retry);
			video.removeEventListener("waiting", retry);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("pageshow", play);
		};
	}, []);

	return (
		<video
			ref={videoRef}
			poster="/hero-poster.jpg"
			autoPlay
			loop
			muted
			playsInline
			preload="auto"
			aria-hidden="true"
			className="absolute inset-0 -z-20 size-full scale-105 object-cover blur-[1px] motion-reduce:hidden"
		>
			{/* Media query keeps reduced-motion visitors from downloading the video. */}
			<source
				src="/hero-video.mp4"
				type="video/mp4"
				media="(prefers-reduced-motion: no-preference)"
			/>
		</video>
	);
}
