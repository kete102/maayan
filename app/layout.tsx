import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { SiteFooter } from "@/components/site-footer";

const cormorant = Cormorant_Garamond({
	variable: "--font-cormorant",
	subsets: ["latin"],
	weight: ["300", "400", "500"],
	style: ["normal", "italic"],
	display: "swap",
});
const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	style: ["normal", "italic"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "MAAYAN",
	description:
		"La belleza despierta algo en nosotros. Creemos que lo que vemos puede ser el comienzo de algo mucho más grande.",
	metadataBase: new URL("https://maayan.shop"),
	openGraph: {
		title: "MAAYAN",
		description:
			"La belleza despierta algo en nosotros. Muy pronto, el 1 de diciembre.",
		images: ["/hero-poster.jpg"],
		locale: "es_ES",
		type: "website",
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
			className={`${cormorant.variable} ${dmSans.variable} bg-background`}
		>
			<body className="font-sans antialiased">
				<SiteShell>{children}</SiteShell>
				{process.env.NODE_ENV === "production" && <Analytics />}
				<SiteFooter />
			</body>
		</html>
	);
}
