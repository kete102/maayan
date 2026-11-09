import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Tenor_Sans, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteShell } from "@/components/site-shell";

const tenor = Tenor_Sans({
	variable: "--font-tenor",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	style: ["normal", "italic"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Maayan -- Escrituras que Fluyen",
	description:
		"Maayan crea Biblias artesanales para acompañar toda una vida de fe. Conoce nuestra historia y descubre nuestra edición Origen.",
	icons: {
		icon: [
			{ url: "/icon-dark-32x32.png" },
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		apple: "/apple-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="es"
			className={`${tenor.variable} ${inter.variable} bg-background`}
		>
			<body className="font-sans antialiased">
				<CartProvider>
					<SiteShell>{children}</SiteShell>
				</CartProvider>
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}
