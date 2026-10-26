"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Home, Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

const navLinks = [
	{ href: "/", label: "Inicio", icon: Home },
	{ href: "/about", label: "Nuestra Historia", icon: BookOpen },
];

const itemClass =
	"text-foreground/85 hover:text-gold group relative flex h-full items-center rounded-full transition-colors duration-300";

// Anima el ancho real del texto sin fijar un max-width
function Collapsible({
	open,
	children,
}: {
	open: boolean;
	children: ReactNode;
}) {
	return (
		<span
			className={cn(
				"grid transition-[grid-template-columns,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
				open ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0"
			)}
		>
			<span className="min-w-0 overflow-hidden whitespace-nowrap">
				{children}
			</span>
		</span>
	);
}

export function SiteHeader() {
	const { count, setIsOpen } = useCart();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [engaged, setEngaged] = useState(false);
	const [overDark, setOverDark] = useState(true);

	useEffect(() => {
		// El header usa texto claro solo sobre secciones marcadas con data-header-theme="dark"
		const update = () => {
			setScrolled(window.scrollY > 48);
			const y = 48;
			const dark = [
				...document.querySelectorAll<HTMLElement>('[data-header-theme="dark"]'),
			].some((el) => {
				const rect = el.getBoundingClientRect();
				return rect.top <= y && rect.bottom >= y;
			});
			setOverDark(dark);
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, []);

	const expanded = !scrolled || engaged || menuOpen;

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-3 z-40 flex justify-center sm:top-5",
				overDark && "dark-surface"
			)}
			onMouseEnter={() => setEngaged(true)}
			onMouseLeave={() => setEngaged(false)}
			onFocus={() => setEngaged(true)}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) {
					setEngaged(false);
				}
			}}
		>
			<div className="flex max-w-[calc(100vw-1.5rem)] flex-col">
				<div
					className={cn(
						"flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 shadow-[inset_0_1px_0_rgb(255_255_255/25%)] backdrop-blur-lg backdrop-saturate-150 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
						expanded ? "h-14" : "h-12"
					)}
				>
					<Logo
						className={cn(
							itemClass,
							"shrink-0 flex-row px-2",
							!overDark && "[&_img]:brightness-[0.45]"
						)}
						hideText={!expanded}
					/>
					<nav
						aria-label="Navegación principal"
						className="hidden h-full items-center gap-1 sm:flex"
					>
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								aria-label={link.label}
								title={link.label}
								className={cn(
									itemClass,
									"after:bg-gold px-3 text-sm font-medium after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
								)}
							>
								<link.icon
									className="size-5 shrink-0"
									strokeWidth={1.6}
									aria-hidden="true"
								/>
								<Collapsible open={expanded}>
									<span className="pl-2">{link.label}</span>
								</Collapsible>
							</Link>
						))}
					</nav>
					<button
						type="button"
						onClick={() => setIsOpen(true)}
						aria-label={`Abrir cesta${count > 0 ? `, ${count} artículos` : ""}`}
						className={cn(itemClass, "relative w-11 shrink-0 justify-center")}
					>
						<ShoppingBag
							className="size-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
							strokeWidth={1.6}
						/>
						{count > 0 && (
							<span className="bg-gold text-canyon-950 absolute top-2 right-1.5 grid size-4 place-items-center rounded-full font-sans text-[0.6rem] font-medium">
								{count}
							</span>
						)}
					</button>
					<button
						type="button"
						onClick={() => setMenuOpen((open) => !open)}
						aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
						aria-expanded={menuOpen}
						aria-controls="mobile-menu"
						className={cn(itemClass, "w-11 shrink-0 justify-center sm:hidden")}
					>
						{menuOpen ? (
							<X
								className="size-5"
								strokeWidth={1.6}
							/>
						) : (
							<Menu
								className="size-5"
								strokeWidth={1.6}
							/>
						)}
					</button>
				</div>
				{menuOpen && (
					<nav
						id="mobile-menu"
						aria-label="Menú móvil"
						className="dark-surface glass mt-2 flex min-w-64 flex-col rounded-3xl p-2 sm:hidden"
					>
						{navLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								onClick={() => setMenuOpen(false)}
								className="text-canyon-50-85 hover:text-gold flex items-center gap-3 rounded-2xl px-4 py-3 font-sans text-base font-medium transition-colors"
							>
								<link.icon
									className="size-5"
									strokeWidth={1.6}
									aria-hidden="true"
								/>
								{link.label}
							</Link>
						))}
					</nav>
				)}
			</div>
		</header>
	);
}
