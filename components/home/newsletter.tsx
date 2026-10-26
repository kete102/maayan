"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!email) return;
		setSubmitted(true);
		setEmail("");
	}

	return (
		<section className="border-border bg-canyon-800 border-y">
			<div className="mx-auto grid max-w-7xl md:grid-cols-[1fr_1fr]">
				<div className="px-8 py-16 md:px-16 md:py-20">
					<h2 className="text-canyon-50 font-serif text-3xl leading-snug font-normal md:text-4xl">
						Reflexiones para llevar contigo
					</h2>
					<p className="text-canyon-50-80 mt-4 max-w-sm font-sans text-sm leading-relaxed font-light">
						Novedades y lecturas para volver a la Palabra, de vez en cuando.
					</p>
				</div>
				<div className="border-canyon-50-15 flex items-center border-t px-8 py-12 md:border-t-0 md:border-l md:px-16">
					{submitted ? (
						<div aria-live="polite">
							<p className="text-gold font-serif text-xl font-normal">
								Gracias por suscribirte.
							</p>
							<p className="text-canyon-50-80 mt-1 font-sans text-sm">
								Recibirás novedades de Maayan en tu correo.
							</p>
						</div>
					) : (
						<form
							onSubmit={handleSubmit}
							className="w-full max-w-sm"
						>
							<label
								htmlFor="newsletter-email"
								className="text-canyon-50-85 block font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase"
							>
								Correo electrónico
							</label>
							<div className="mt-3 flex">
								<input
									id="newsletter-email"
									type="email"
									required
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									placeholder="tu@correo.com"
									className="border-canyon-50-30 bg-canyon-950/55 text-canyon-50 placeholder:text-canyon-50-70 focus:border-gold focus:ring-gold/30 min-w-0 flex-1 border px-4 py-3 font-sans text-sm transition-colors outline-none focus:ring-2"
								/>
								<button
									type="submit"
									className="border-canyon-50 bg-canyon-50 text-canyon-950 hover:border-gold hover:bg-gold border px-5 py-3 font-sans text-xs font-medium tracking-[0.18em] uppercase transition-colors"
								>
									Unirse
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</section>
	);
}
