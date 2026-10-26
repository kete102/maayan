export function WaveDivider({
	className = "",
	flip = false,
}: {
	className?: string;
	flip?: boolean;
}) {
	return (
		<div
			className={className}
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 1440 80"
				preserveAspectRatio="none"
				className="h-12 w-full md:h-20"
				style={flip ? { transform: "scaleY(-1)" } : undefined}
			>
				<path
					d="M0 24H460L490 36H950L980 24H1440"
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
				/>
				<path
					d="M0 42H310L340 54H1100L1130 42H1440"
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
					opacity=".55"
				/>
				<path
					d="M0 60H560L590 70H850L880 60H1440"
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
					opacity=".3"
				/>
			</svg>
		</div>
	);
}
