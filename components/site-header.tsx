"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon, ShoppingBagIcon, XIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart/cart-provider";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const navLinks = [
	{ href: "/", label: "Biblias" },
	{ href: "/about", label: "Nuestra Historia" },
];

const MOBILE_MENU_ID = "mobile-menu";

export function SiteHeader() {
	const { count, setIsOpen, isOpen } = useCart();
	const pathname = usePathname();
	// The menu is tied to the path it was opened on, so navigating closes it.
	const [menuPath, setMenuPath] = useState<string | null>(null);
	if (menuPath !== null && menuPath !== pathname) {
		setMenuPath(null);
	}
	const menuOpen = menuPath === pathname;

	useEffect(() => {
		if (!menuOpen) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setMenuPath(null);
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [menuOpen]);

	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname.startsWith(href);

	return (
		<MotionConfig reducedMotion="user">
			<header className="relative z-40 flex h-24 w-full items-center justify-between px-4 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-14">
				<Logo
					className="justify-self-start"
					compactOnMobile
				/>

				<nav
					aria-label="Principal"
					className="max-lg:hidden"
				>
					<ul className="flex items-center gap-8">
						{navLinks.map(({ href, label }) => {
							const active = isActive(href);
							return (
								<li key={href}>
									<Link
										href={href}
										aria-current={active ? "page" : undefined}
										className="text-foreground relative inline-block pb-1 text-[0.875rem] leading-5 font-normal whitespace-nowrap"
									>
										{label}
										{active && (
											<motion.span
												layoutId="nav-underline"
												className="bg-accent absolute inset-x-0 bottom-0 h-0.5 rounded-full"
												transition={{
													type: "spring",
													stiffness: 400,
													damping: 35,
												}}
											/>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="flex items-center justify-self-end">
					<button
						className="size-touch-target relative grid cursor-pointer place-items-center"
						onClick={() => {
							setMenuPath(null);
							setIsOpen(!isOpen);
						}}
						aria-label={`Abrir carrito${count > 0 ? `, ${count} artículos` : ""}`}
					>
						<ShoppingBagIcon className="size-5" />
						{count > 0 && (
							<span className="bg-foreground text-primary-foreground absolute top-1 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs leading-none">
								{count}
							</span>
						)}
					</button>
					<button
						className="size-touch-target grid cursor-pointer place-items-center lg:hidden"
						onClick={() => setMenuPath(menuOpen ? null : pathname)}
						aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
						aria-expanded={menuOpen}
						aria-controls={MOBILE_MENU_ID}
					>
						{menuOpen ? (
							<XIcon className="size-6" />
						) : (
							<MenuIcon className="size-6" />
						)}
					</button>
				</div>

				<AnimatePresence>
					{menuOpen && (
						<>
							<motion.button
								type="button"
								aria-label="Cerrar menú"
								tabIndex={-1}
								className="bg-ink/25 fixed inset-x-0 top-24 bottom-0 -z-10 cursor-default backdrop-blur-sm lg:hidden"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
								onClick={() => setMenuPath(null)}
							/>
							<motion.nav
								id={MOBILE_MENU_ID}
								aria-label="Menú móvil"
								className="bg-background/95 supports-[backdrop-filter]:bg-background/80 border-border absolute inset-x-0 top-full border-y backdrop-blur-xl backdrop-saturate-150 lg:hidden"
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
							>
								<ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-8">
									{navLinks.map(({ href, label }) => {
										const active = isActive(href);
										return (
											<li key={href}>
												<Link
													href={href}
													aria-current={active ? "page" : undefined}
													onClick={() => setMenuPath(null)}
													className="text-foreground min-h-touch-target flex items-center justify-between py-2 text-lg"
												>
													<span
														className={
															active
																? "decoration-accent underline decoration-2 underline-offset-8"
																: undefined
														}
													>
														{label}
													</span>
												</Link>
											</li>
										);
									})}
								</ul>
							</motion.nav>
						</>
					)}
				</AnimatePresence>
			</header>
		</MotionConfig>
	);
}
