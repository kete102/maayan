"use client";

import Image from "next/image";

export function ProductShowcase({
	image,
	alt,
}: {
	image: string;
	alt: string;
}) {
	return (
		<div className="border-canyon-50-20 relative mx-auto aspect-square w-full max-w-[min(30rem,55dvh)] overflow-hidden rounded-3xl border bg-[radial-gradient(circle_at_30%_20%,#f7f1e6,#e4d6bd)] shadow-2xl shadow-black/40 lg:max-w-[min(30rem,70dvh)]">
			<Image
				src={image}
				alt={alt}
				fill
				priority
				sizes="(max-width: 768px) 90vw, 30rem"
				className="object-cover mix-blend-multiply"
			/>
			<video
				className="absolute inset-0 size-full object-cover mix-blend-multiply motion-reduce:hidden"
				autoPlay
				muted
				loop
				playsInline
				preload="metadata"
				aria-hidden="true"
			>
				<source
					src="/videos/bible-rotation.webm"
					type="video/webm"
				/>
				<source
					src="/videos/bible-rotation.mp4"
					type="video/mp4"
				/>
			</video>
		</div>
	);
}
