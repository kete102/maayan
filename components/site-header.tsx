"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Tienda" },
  { href: "/shop?collection=study-bibles", label: "Biblias de Estudio" },
  { href: "/shop?collection=premium-leather", label: "Cuero Premium" },
  { href: "/about", label: "Nuestra Historia" },
];

export function SiteHeader() {
  const { count, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-12 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Alternar menú"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-light tracking-wide text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            aria-label="Buscar"
            className="hidden text-foreground/80 transition-colors hover:text-foreground sm:block"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir carrito"
            className="relative text-foreground/80 transition-colors hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[0.6rem] font-medium text-primary">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* menú móvil */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 transition-[max-height] duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base font-light tracking-wide text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
