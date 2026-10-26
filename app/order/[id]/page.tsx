import { supabase, type Order } from "@/lib/supabase";
import { formatPrice } from "@/lib/products";
import { CheckCircle2, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";

export default async function OrderPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const { data: order, error } = await supabase
		.from("orders")
		.select("*")
		.eq("id", id)
		.single<Order>();

	if (error || !order) {
		notFound();
	}

	const createdAt = new Date(order.created_at).toLocaleDateString("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<SiteShell>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
				{/* Header */}
				<div className="mb-10 flex items-center gap-4">
					<div className="border-border bg-secondary text-gold flex h-12 w-12 items-center justify-center border">
						<CheckCircle2 className="h-6 w-6" />
					</div>
					<div>
						<h1 className="text-foreground font-serif text-3xl">Tu pedido</h1>
						<p className="text-muted-foreground text-sm">
							Realizado el {createdAt}
						</p>
					</div>
				</div>

				{/* Order meta */}
				<div className="border-border bg-card mb-8 space-y-3 border p-6 text-sm">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Número de pedido</span>
						<span className="text-foreground font-mono text-xs">
							{order.id.slice(0, 8).toUpperCase()}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Estado</span>
						<span className="text-foreground capitalize">
							{order.status.toLowerCase()}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Transacción PayPal</span>
						<span className="text-foreground font-mono text-xs">
							{order.paypal_transaction_id}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Correo</span>
						<span className="text-foreground">{order.payer_email}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Teléfono</span>
						<span className="text-foreground">
							{order.shipping_phone || "—"}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Envío a</span>
						<span className="text-foreground text-right">
							{[
								order.shipping_address,
								order.shipping_city,
								order.shipping_state,
								order.shipping_postal,
								order.shipping_country,
							]
								.filter(Boolean)
								.join(", ")}
						</span>
					</div>
				</div>

				{/* Items */}
				<div className="mb-8">
					<h2 className="text-foreground mb-4 font-serif text-xl">Artículos</h2>
					<ul className="space-y-4">
						{order.items.map((item) => (
							<li
								key={item.productId}
								className="border-border bg-card flex gap-4 border p-4"
							>
								<div className="border-border bg-parchment relative h-16 w-16 shrink-0 overflow-hidden border">
									{item.image ? (
										<Image
											src={item.image}
											alt={item.name}
											fill
											className="object-contain p-1"
											sizes="64px"
										/>
									) : (
										<div className="flex h-full items-center justify-center">
											<Package className="text-muted-foreground h-6 w-6" />
										</div>
									)}
								</div>
								<div className="flex flex-1 items-center justify-between gap-2">
									<div>
										<p className="text-foreground text-sm">{item.name}</p>
										<p className="text-muted-foreground text-xs">
											Cantidad: {item.quantity}
										</p>
									</div>
									<span className="text-muted-foreground text-sm">
										{formatPrice(item.price * item.quantity)}
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>

				{/* Total */}
				<div className="border-border bg-card text-foreground flex justify-between border px-6 py-4 text-base font-medium">
					<span>Total cobrado</span>
					<span>{formatPrice(order.amount)}</span>
				</div>

				{/* Back link */}
				<div className="mt-10 text-center">
					<Link
						href="/"
						className="text-muted-foreground text-sm underline-offset-4 hover:underline"
					>
						Seguir explorando la colección
					</Link>
				</div>
			</div>
		</SiteShell>
	);
}
