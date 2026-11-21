"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { useRef, useState } from "react";
import type { SubmitEvent } from "react";

import { WaitlistSuccess } from "@/components/waitlist/waitlist-success";

type FormStatus = "idle" | "loading" | "success" | "error";

function WaitlistPromotion() {
	return (
		<div className="mb-6 flex flex-col items-center text-center">
			<div className="bg-border my-4 h-px w-8" />
		</div>
	);
}

export function WaitlistFormPage() {
	const [formStatus, setFormStatus] = useState<FormStatus>("idle");
	const [errorMessage, setErrorMessage] = useState("");
	const submittingRef = useRef(false);

	const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (submittingRef.current) return;

		const form = event.currentTarget;
		const formData = new FormData(form);

		const payload = {
			user_name: String(formData.get("user_name") ?? "").trim(),
			user_last_name: String(formData.get("user_last_name") ?? "").trim(),
			user_email: String(formData.get("user_email") ?? "")
				.trim()
				.toLowerCase(),
			privacy_accepted_at: formData.get("privacy_accepted_at") === "on",
		};

		submittingRef.current = true;
		setFormStatus("loading");
		setErrorMessage("");

		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const result = await response.json();

			if (response.status === 429) {
				throw new Error(
					"Has realizado demesiados intentos. Vuelve a intentarlo más tarde."
				);
			}

			if (!response.ok) {
				throw new Error(
					typeof result.error === "string"
						? result.error
						: "No se ha podido completar el registro."
				);
			}

			setFormStatus("success");
		} catch (error) {
			setFormStatus("error");

			setErrorMessage(
				error instanceof Error
					? error.message
					: "Ha ocurrido un error inesperado."
			);
		} finally {
			submittingRef.current = false;
		}
	};

	const isLoading = formStatus === "loading";

	const inputClassName =
		"type-body-sm border-border placeholder:text-muted-foreground/60 " +
		"focus:border-foreground w-full rounded-none border-0 border-b " +
		"bg-transparent px-0 py-3 ring-0 " +
		"transition-[border-color,box-shadow] duration-300 outline-none " +
		"focus:ring-0 focus:outline-none " +
		"focus-visible:ring-0 focus-visible:outline-none";

	return (
		<main className="text-foreground flex min-h-screen flex-col bg-white">
			{/* Header */}
			<header className="flex items-center justify-between px-5 py-8 md:px-12">
				<Link
					href="/"
					aria-lable="MAAYAN - Ir al inicio"
					className="type-wordmark tracking-[0.25em]"
				>
					MAAYAN
				</Link>

				<Link
					href="/"
					className="type-overline group inline-flex items-center gap-2 opacity-70 transition-opacity duration-300 ease-in-out hover:opacity-100"
				>
					Volver
					<ArrowUpRightIcon
						className="size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
						strokeWidth={1.25}
					/>
				</Link>
			</header>

			{/* Main content */}
			<section className="flex flex-1 items-center justify-center px-6 py-20">
				<AnimatePresence
					mode="wait"
					initial={false}
				>
					{formStatus === "success" ? (
						<motion.div
							key="success"
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							transition={{
								duration: 0.6,
								ease: "easeOut",
							}}
							className="w-full max-w-110"
						>
							<WaitlistSuccess />
						</motion.div>
					) : (
						<motion.div
							key="form"
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{
								opacity: 0,
								y: -12,
								transition: {
									duration: 0.3,
									ease: "easeIn",
								},
							}}
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
									transition={{
										delay: 0.2,
										duration: 0.7,
									}}
									className="type-overline text-muted-foreground mb-6"
								>
									<div className="flex w-full flex-row items-center justify-center gap-4">
										<p className="type-body text-foreground/80">
											ORIGEN · 1 de diciembre
										</p>
									</div>
								</motion.p>

								<h1 className="type-h2 md:text-5xl">
									Forma parte del
									<br />
									<span className="italic">comienzo.</span>
								</h1>

								<p className="type-body text-muted-foreground mx-auto mt-5 max-w-lg text-pretty">
									Queremos agradecer a las primeras 50 personas que se unan a
									nuestra lista de espera con un código exclusivo de 5 € de
									regalo para el lanzamiento.
								</p>

								<div className="bg-border mx-auto mt-8 h-px w-8" />
							</div>

							{/* Form */}
							<form
								onSubmit={handleSubmit}
								className="flex flex-col gap-8"
							>
								{/* Name */}
								<div>
									<label
										htmlFor="user_name"
										className="type-overline text-muted-foreground mb-2 block"
									>
										Nombre
									</label>

									<input
										id="user_name"
										name="user_name"
										type="text"
										autoComplete="given-name"
										required
										maxLength={100}
										placeholder="Tu nombre"
										className={inputClassName}
									/>
								</div>

								{/* Surname */}
								<div>
									<label
										htmlFor="user_last_name"
										className="type-overline text-muted-foreground mb-2 block"
									>
										Apellidos
									</label>

									<input
										id="user_last_name"
										name="user_last_name"
										type="text"
										autoComplete="family-name"
										required
										maxLength={150}
										placeholder="Tus apellidos"
										className={inputClassName}
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
										name="user_email"
										type="email"
										autoComplete="email"
										required
										maxLength={254}
										placeholder="ejemplo@email.com"
										className={inputClassName}
									/>
								</div>

								{/* Privacy */}
								<label className="flex cursor-pointer items-start gap-3">
									<input
										type="checkbox"
										name="privacy_accepted_at"
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
									disabled={isLoading}
									initial="rest"
									whileHover={isLoading ? "rest" : "hover"}
									variants={{
										rest: { scale: 1 },
										hover: { scale: 1.01 },
									}}
									className="type-button text-background bg-foreground group min-h-control rounded-pill flex w-full cursor-pointer items-center justify-center gap-3 px-8 transition-colors duration-300 disabled:cursor-wait disabled:opacity-70"
								>
									{isLoading ? (
										<span role="status">Enviando...</span>
									) : (
										<>
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
										</>
									)}
								</motion.button>

								{/* Availability notice */}
								<p className="type-body-sm text-muted-foreground text-center">
									La inscripción no reserva ni garantiza la disponibilidad de
									una Biblia.
								</p>

								{/* Error */}
								{formStatus === "error" && (
									<motion.p
										role="alert"
										initial={{ opacity: 0, y: -4 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
										className="type-body-sm text-destructive text-center"
									>
										{errorMessage}
									</motion.p>
								)}
							</form>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
		</main>
	);
}

export default WaitlistFormPage;
