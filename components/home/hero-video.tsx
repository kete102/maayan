export function HeroVideo() {
	return (
		<video
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
	);
}
