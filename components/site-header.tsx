"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart/cart-provider";

const navLinks = [
	{ href: "/", label: "Biblias" },
	{ href: "/about", label: "Nuestra Historia" },
];

export function SiteHeader() {
	const { count, setIsOpen } = useCart();
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [engaged, setEngaged] = useState(false);
	const [overDark, setOverDark] = useState(true);

	return (
		<header className="flex h-24 items-center justify-between px-14">
			<Logo />
			<nav className="flex items-center">
				<ol className="flex items-center gap-8">
					{navLinks.map((navItem) => (
						<Link
							key={navItem.href}
							href={navItem}
							className="text-[0.875rem] leading-5 font-normal text-[#302C26]"
						>
							{navItem.label}
						</Link>
					))}
				</ol>
			</nav>
			<button>
				<ShoppingBagIcon />
			</button>
		</header>
		// <header
		// 	className={cn(
		// 		"fixed inset-x-0 top-3 z-40 flex justify-center sm:top-5",
		// 		overDark && "dark-surface"
		// 	)}
		// 	onMouseEnter={() => setEngaged(true)}
		// 	onMouseLeave={() => setEngaged(false)}
		// 	onFocus={() => setEngaged(true)}
		// 	onBlur={(event) => {
		// 		if (!event.currentTarget.contains(event.relatedTarget)) {
		// 			setEngaged(false);
		// 		}
		// 	}}
		// >
		// 	<div className="flex max-w-[calc(100vw-1.5rem)] flex-col">
		// 		<div
		// 			className={cn(
		// 				"flex items-center gap-1 rounded-full border border-white/25 bg-white/10 px-2 shadow-[inset_0_1px_0_rgb(255_255_255/25%)] backdrop-blur-lg backdrop-saturate-150 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
		// 				expanded ? "h-14" : "h-12"
		// 			)}
		// 		>
		// 			<Logo
		// 				className={cn(
		// 					itemClass,
		// 					"shrink-0 flex-row px-2",
		// 					!overDark && "[&_img]:brightness-[0.45]"
		// 				)}
		// 				hideText={!expanded}
		// 			/>
		// 			<nav
		// 				aria-label="Navegación principal"
		// 				className="hidden h-full items-center gap-1 sm:flex"
		// 			>
		// 				{navLinks.map((link) => (
		// 					<Link
		// 						key={link.label}
		// 						href={link.href}
		// 						aria-label={link.label}
		// 						title={link.label}
		// 						className={cn(
		// 							itemClass,
		// 							"after:bg-gold px-3 text-sm font-medium after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100"
		// 						)}
		// 					>
		// 						<link.icon
		// 							className="size-5 shrink-0"
		// 							strokeWidth={1.6}
		// 							aria-hidden="true"
		// 						/>
		// 						<Collapsible open={expanded}>
		// 							<span className="pl-2">{link.label}</span>
		// 						</Collapsible>
		// 					</Link>
		// 				))}
		// 			</nav>
		// 			<button
		// 				type="button"
		// 				onClick={() => setIsOpen(true)}
		// 				aria-label={`Abrir cesta${count > 0 ? `, ${count} artículos` : ""}`}
		// 				className={cn(itemClass, "relative w-11 shrink-0 justify-center")}
		// 			>
		// 				<ShoppingBag
		// 					className="size-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
		// 					strokeWidth={1.6}
		// 				/>
		// 				{count > 0 && (
		// 					<span className="bg-gold text-canyon-950 absolute top-2 right-1.5 grid size-4 place-items-center rounded-full font-sans text-[0.6rem] font-medium">
		// 						{count}
		// 					</span>
		// 				)}
		// 			</button>
		// 			<button
		// 				type="button"
		// 				onClick={() => setMenuOpen((open) => !open)}
		// 				aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
		// 				aria-expanded={menuOpen}
		// 				aria-controls="mobile-menu"
		// 				className={cn(itemClass, "w-11 shrink-0 justify-center sm:hidden")}
		// 			>
		// 				{menuOpen ? (
		// 					<X
		// 						className="size-5"
		// 						strokeWidth={1.6}
		// 					/>
		// 				) : (
		// 					<Menu
		// 						className="size-5"
		// 						strokeWidth={1.6}
		// 					/>
		// 				)}
		// 			</button>
		// 		</div>
		// 		{menuOpen && (
		// 			<nav
		// 				id="mobile-menu"
		// 				aria-label="Menú móvil"
		// 				className="dark-surface glass mt-2 flex min-w-64 flex-col rounded-3xl p-2 sm:hidden"
		// 			>
		// 				{navLinks.map((link) => (
		// 					<Link
		// 						key={link.label}
		// 						href={link.href}
		// 						onClick={() => setMenuOpen(false)}
		// 						className="text-canyon-50-85 hover:text-gold flex items-center gap-3 rounded-2xl px-4 py-3 font-sans text-base font-medium transition-colors"
		// 					>
		// 						<link.icon
		// 							className="size-5"
		// 							strokeWidth={1.6}
		// 							aria-hidden="true"
		// 						/>
		// 						{link.label}
		// 					</Link>
		// 				))}
		// 			</nav>
		// 		)}
		// 	</div>
		// </header>
	);
}
