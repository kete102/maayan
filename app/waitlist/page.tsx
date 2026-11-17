"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

export function WaitlistFormPage() {
	return (
		<main className="text-foreground flex min-h-screen flex-col bg-white">
			{/* Header */}
			<header className="flex items-center justify-between px-6 py-8 md:px-12">
				<Link
					href="/"
					className="type-wordmark tracking-[0.25em]"
				>
					MAAYAN
				</Link>

				<Link
					href="/"
					className="type-overline group inline-flex items-center gap-2 opacity-70 transition-opacity duration-300 ease-in-out hover:opacity-100"
				>
					Volver al inicio
					<ArrowUpRightIcon
						className="size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						strokeWidth={1.25}
					/>
				</Link>
			</header>

			{/* Main */}
			<section className="flex flex-1 items-center justify-center px-6 py-20">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
					className="w-full max-w-110"
				>
					{/* Introduction */}
					<div className="mb-14 text-center">
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.7 }}
							className="type-overline text-muted-foreground mb-6"
						>
							El comienzo de algo nuevo
						</motion.p>

						<h1 className="type-h2 md:text-5xl">
							Forma parte del
							<br />
							<span className="italic">comienzo.</span>
						</h1>

						<p className="type-body-sm text-muted-foreground mx-auto mt-6 max-w-85">
							Estamos preparando algo especial. Déjanos tus datos y serás de las
							primeras personas en descubrir MAAYAN.
						</p>
					</div>

					{/* Form */}
					<form
						action="/api/waitlist"
						method="POST"
						className="flex flex-col gap-8"
					>
						{/* Name */}
						<div>
							<label
								htmlFor="name"
								className="type-overline text-muted-foreground mb-2 block"
							>
								Nombre
							</label>

							<input
								id="name"
								name="name"
								type="text"
								autoComplete="given-name"
								placeholder="Tu nombre"
								className="type-body-sm border-border placeholder:text-muted-foreground/60 focus:border-foreground w-full rounded-none border-0 border-b bg-transparent px-0 py-3 ring-0 transition-[border-color,box-shadow] duration-300 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
							/>
						</div>

						{/* Surname */}
						<div>
							<label
								htmlFor="surname"
								className="type-overline text-muted-foreground mb-2 block"
							>
								Apellidos
							</label>

							<input
								id="surname"
								name="surname"
								type="text"
								autoComplete="family-name"
								placeholder="Tus apellidos"
								className="type-body-sm border-border placeholder:text-muted-foreground/60 focus:border-foreground w-full rounded-none border-0 border-b bg-transparent px-0 py-3 ring-0 transition-[border-color,box-shadow] duration-300 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
							/>
						</div>

						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="type-overline text-muted-foreground mb-2 block"
							>
								Correo electrónico
							</label>

							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								placeholder="ejemplo@email.com"
								className="type-body-sm border-border placeholder:text-muted-foreground/60 focus:border-foreground w-full rounded-none border-0 border-b bg-transparent px-0 py-3 ring-0 transition-[border-color,box-shadow] duration-300 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
							/>
						</div>

						{/* Privacy */}
						<label className="flex cursor-pointer items-start gap-3">
							<input
								type="checkbox"
								name="privacy"
								required
								className="border-border accent-ink mt-1 size-4 shrink-0 rounded-none"
							/>

							<span className="type-body-sm text-muted-foreground">
								He leído y acepto la{" "}
								<Link
									href="/privacidad"
									className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-60"
								>
									política de privacidad
								</Link>
								.
							</span>
						</label>

						{/* Submit */}
						<motion.button
							type="submit"
							whileHover="hover"
							initial="rest"
							variants={{
								rest: { scale: 1 },
								hover: { scale: 1.01 },
							}}
							className="type-button text-background bg-foreground group min-h-control rounded-pill flex w-full cursor-pointer items-center justify-center gap-3 px-8 transition-colors duration-300"
						>
							Quiero formar parte
							<motion.span
								variants={{
									rest: { x: 0 },
									hover: { x: 4 },
								}}
								transition={{
									duration: 0.3,
									ease: "easeOut",
								}}
							>
								<ArrowRightIcon
									size={18}
									strokeWidth={1.5}
								/>
							</motion.span>
						</motion.button>
					</form>
				</motion.div>
			</section>
		</main>
	);
}

export default WaitlistFormPage;
