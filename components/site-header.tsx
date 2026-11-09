"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart/cart-provider";
import { usePathname } from "next/navigation";
import { motion, MotionConfig } from "motion/react";

const navLinks = [
	{ href: "/", label: "Biblias" },
	{ href: "/about", label: "Nuestra Historia" },
];

export function SiteHeader() {
	const { count, setIsOpen, isOpen } = useCart();
	const pathname = usePathname();

	return (
		<header className="grid h-24 w-full grid-cols-[1fr_auto_1fr] items-center px-14">
			<Logo className="justify-self-start" />
			<MotionConfig reducedMotion="user">
				<nav aria-label="Principal">
					<ul className="flex items-center gap-8">
						{navLinks.map(({ href, label }) => {
							const active =
								href === "/" ? pathname === "/" : pathname.startsWith(href);
							return (
								<li key={href}>
									<Link
										href={href}
										aria-current={active ? "page" : undefined}
										className="text-foreground relative inline-block pb-1 text-[0.875rem] leading-5 font-normal"
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
			</MotionConfig>
			<button
				className="relative cursor-pointer justify-self-end"
				onClick={() => setIsOpen(!isOpen)}
				aria-label={`Abrir carrito${count > 0 ? `, ${count} artículos` : ""}`}
			>
				<ShoppingBagIcon className="size-5" />
				{count > 0 && (
					<span className="bg-foreground text-primary-foreground absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs leading-none">
						{count}
					</span>
				)}
			</button>
		</header>
	);
}
