import { Suspense } from "react";
import { SiteShell } from "@/components/site-shell";
import { CheckoutSuccessContent } from "./success-content";

export default function CheckoutSuccessPage() {
	return (
		<SiteShell>
			<Suspense
				fallback={
					<div className="mx-auto max-w-xl px-4 py-24 text-center">
						<p className="text-muted-foreground">Cargando...</p>
					</div>
				}
			>
				<CheckoutSuccessContent />
			</Suspense>
		</SiteShell>
	);
}
