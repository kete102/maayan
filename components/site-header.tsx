"use client";

import { useState, useEffect, useRef } from "react";
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
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at the very top
        setVisible(true);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up — show
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down — hide
        setVisible(false);
        // Close mobile menu when hiding
        setMobileOpen(false);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full p-4 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 md:h-12 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Alternar menú"
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg font-medium tracking-wide text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            aria-label="Buscar"
            className="hidden text-white/80 transition-colors hover:text-white sm:block"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir carrito"
            className="relative text-white/80 transition-colors hover:text-white"
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
          "overflow-hidden border-t border-white/10 bg-white/5 backdrop-blur-md transition-[max-height] duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base font-light tracking-wide text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

