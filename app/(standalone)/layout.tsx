import { StandaloneHeader } from "@/components/standalone-header";

export default function StandaloneLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex flex-1 flex-col">
			<StandaloneHeader />
			{children}
		</main>
	);
}
