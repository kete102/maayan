export function SiteShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-dvh flex-col">
			<main className="flex-1">{children}</main>
		</div>
	);
}
