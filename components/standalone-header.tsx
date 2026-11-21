import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export function StandaloneHeader() {
	return (
		<header className="flex items-center justify-between px-5 py-8 md:px-12">
			<Link
				href="/"
				aria-label="MAAYAN - Ir al inicio"
				className="type-wordmark tracking-[0.25em]"
			>
				MAAYAN
			</Link>

			<Link
				href="/"
				transitionTypes={["nav-back"]}
				className="type-overline group inline-flex items-center gap-2 opacity-70 transition-opacity duration-300 ease-in-out hover:opacity-100"
			>
				Volver
				<ArrowLeftIcon
					className="size-5 transition-transform duration-300 ease-in-out group-hover:-translate-x-0.5"
					strokeWidth={1.25}
				/>
			</Link>
		</header>
	);
}
