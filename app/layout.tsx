import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Tenor_Sans, Inter } from "next/font/google";
import "./globals.css";
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
	title: "MAAYAN",
	description:
		"Hay bellezas que despiertan algo en nosotros. Creemos que lo que vemos puede ser el comienzo de algo mucho más grande.",
	openGraph: {
		title: "MAAYAN",
		description:
			"Hay bellezas que despiertan algo en nosotros. Muy pronto, el 1 de diciembre.",
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
			className={`${tenor.variable} ${inter.variable} bg-background`}
		>
			<body className="font-sans antialiased">
				<SiteShell>{children}</SiteShell>
				{process.env.NODE_ENV === "production" && <Analytics />}
			</body>
		</html>
	);
}
