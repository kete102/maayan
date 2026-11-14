export function HeroVideo() {
	return (
		<video
			poster="/hero-poster.jpg"
			autoPlay
			loop
			muted
			playsInline
			preload="metadata"
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
