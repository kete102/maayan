import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";

const cormorant = Cormorant_Garamond({
	variable: "--font-cormorant",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
});
const jost = Jost({
	variable: "--font-jost",
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Maayan -- Escrituras que Fluyen",
	description:
		"Maayan crea Biblias artesanales para acompañar toda una vida de fe. Conoce nuestra historia y descubre nuestra edición Agua Viva.",
	generator: "v0.app",
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
			className={`${cormorant.variable} ${jost.variable} ${geistMono.variable} bg-background`}
		>
			<body className="font-sans antialiased">
				<CartProvider>{children}</CartProvider>
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}
