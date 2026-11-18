import { motion } from "motion/react";
import { Check } from "lucide-react";

export function WaitlistSuccess() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.6,
				ease: "easeOut",
			}}
			role="status"
			className="flex flex-col items-center text-center"
		>
			<div className="border-border mb-8 flex size-14 items-center justify-center rounded-full border">
				<Check
					className="text-ink size-6"
					strokeWidth={1.25}
				/>
			</div>

			<p className="type-overline text-muted-foreground mb-5">
				Ya formas parte de MAAYAN
			</p>

			<h2 className="type-h2 mb-6">
				Gracias por formar parte
				<br />
				del <span className="italic">comienzo.</span>
			</h2>

			<p className="type-body-sm text-muted-foreground max-w-sm">
				Tu registro se ha completado correctamente. Muy pronto descubrirás lo
				que estamos preparando.
			</p>
		</motion.div>
	);
}
