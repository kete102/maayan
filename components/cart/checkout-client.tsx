"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { calcShipping, calcTax, calcTotal } from "@/lib/pricing";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Field = {
	id: string;
	label: string;
	type?: string;
	autoComplete?: string;
	half?: boolean;
};

const contactFields: Field[] = [
	{
		id: "email",
		label: "Correo electrónico",
		type: "email",
		autoComplete: "email",
	},
	{
		id: "phone",
		label: "Teléfono",
		type: "tel",
		autoComplete: "tel",
	},
];

const shippingFields: Field[] = [
	{ id: "firstName", label: "Nombre", autoComplete: "given-name", half: true },
	{
		id: "lastName",
		label: "Apellido",
		autoComplete: "family-name",
		half: true,
	},
	{ id: "address", label: "Dirección", autoComplete: "street-address" },
	{ id: "city", label: "Ciudad", autoComplete: "address-level2", half: true },
	{
		id: "state",
		label: "Estado / Provincia",
		autoComplete: "address-level1",
		half: true,
	},
	{
		id: "postal",
		label: "Código postal",
		autoComplete: "postal-code",
		half: true,
	},
	{
		id: "country",
		label: "País",
		autoComplete: "country-name",
		half: true,
	},
];

export function CheckoutClient() {
	const { items, subtotal } = useCart();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const shipping = calcShipping(subtotal);
	const tax = calcTax(subtotal);
	const total = calcTotal(subtotal);

	async function handleSubmitOrder(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const formData = new FormData(e.currentTarget);

			const shippingInfo = {
				firstName: formData.get("firstName") as string,
				lastName: formData.get("lastName") as string,
				email: formData.get("email") as string,
				phone: formData.get("phone") as string,
				address: formData.get("address") as string,
				city: formData.get("city") as string,
				state: formData.get("state") as string,
				postal: formData.get("postal") as string,
				country: formData.get("country") as string,
			};

			const res = await fetch("/api/paypal/create-order", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					amount: total.toFixed(2),
					shipping: shipping.toFixed(2),
					tax: tax.toFixed(2),
					currency: "USD",
					cart_items: items,
				}),
			});

			const data = await res.json();

			if (!res.ok || !data.returnURL) {
				setError("No se pudo iniciar el pago. Intenta de nuevo.");
				setLoading(false);
				return;
			}

			// Save cart and shipping info to sessionStorage before leaving the page
			sessionStorage.setItem("paypal_cart_backup", JSON.stringify(items));
			sessionStorage.setItem(
				"paypal_shipping_backup",
				JSON.stringify(shippingInfo)
			);

			window.location.href = data.returnURL;
		} catch {
			setError("Ocurrió un error inesperado. Intenta de nuevo.");
			setLoading(false);
		}
	}

	if (items.length === 0) {
		return (
			<div className="mx-auto max-w-xl px-4 py-24 text-center">
				<h1 className="text-foreground font-serif text-4xl">
					Tu carrito está vacío
				</h1>
				<p className="text-muted-foreground mt-4 leading-relaxed">
					Añade una Biblia a tu carrito antes de proceder al pago.
				</p>
				<Button
					render={<Link href="/" />}
					className="mt-8 px-8"
				>
					Explorar la colección
				</Button>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
			<h1 className="text-foreground font-serif text-4xl">Pago</h1>
			<div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
				<form
					onSubmit={handleSubmitOrder}
					className="space-y-10"
				>
					<Section
						title="Contacto"
						fields={contactFields}
					/>
					<Section
						title="Dirección de envío"
						fields={shippingFields}
					/>

					{error && <p className="text-destructive text-sm">{error}</p>}
					<Button
						type="submit"
						size="lg"
						disabled={loading}
						className="w-full text-base disabled:opacity-60"
					>
						{loading
							? "Redirigiendo a PayPal..."
							: `Pagar con PayPal — ${formatPrice(total)}`}
					</Button>
				</form>

				<aside className="border-border bg-card h-fit rounded-2xl border p-6 lg:sticky lg:top-28">
					<h2 className="text-foreground font-serif text-xl">
						Resumen del pedido
					</h2>
					<ul className="mt-6 space-y-4">
						{items.map((item) => (
							<li
								key={item.product.id}
								className="flex gap-4"
							>
								<div className="border-border bg-parchment relative h-16 w-16 shrink-0 overflow-hidden border">
									<Image
										src={item.product.image || "/placeholder.svg"}
										alt={item.product.name}
										fill
										className="object-contain p-1"
										sizes="64px"
									/>
									<span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center text-[10px] font-medium">
										{item.quantity}
									</span>
								</div>
								<div className="flex flex-1 items-center justify-between gap-2">
									<span className="text-foreground text-sm">
										{item.product.name}
									</span>
									<span className="text-muted-foreground text-sm">
										{formatPrice(item.product.price * item.quantity)}
									</span>
								</div>
							</li>
						))}
					</ul>

					<dl className="border-border mt-6 space-y-3 border-t pt-6 text-sm">
						<div className="text-muted-foreground flex justify-between">
							<dt>Subtotal</dt>
							<dd>{formatPrice(subtotal)}</dd>
						</div>
						<div className="text-muted-foreground flex justify-between">
							<dt>Envío</dt>
							<dd>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</dd>
						</div>
						<div className="text-muted-foreground flex justify-between">
							<dt>Impuesto estimado</dt>
							<dd>{formatPrice(tax)}</dd>
						</div>
						<div className="border-border text-foreground flex justify-between border-t pt-3 text-base font-medium">
							<dt>Total</dt>
							<dd>{formatPrice(total)}</dd>
						</div>
					</dl>
				</aside>
			</div>
		</div>
	);
}

function Section({
	title,
	fields,
	note,
}: {
	title: string;
	fields: Field[];
	note?: string;
}) {
	return (
		<fieldset>
			<legend className="text-foreground font-serif text-xl">{title}</legend>
			{note ? (
				<p className="text-muted-foreground mt-1 text-xs">{note}</p>
			) : null}
			<div className="mt-5 grid grid-cols-2 gap-4">
				{fields.map((field) => (
					<div
						key={field.id}
						className={field.half ? "col-span-1" : "col-span-2"}
					>
						<label
							htmlFor={field.id}
							className="text-foreground mb-1.5 block text-sm"
						>
							{field.label}
						</label>
						<input
							id={field.id}
							name={field.id}
							type={field.type ?? "text"}
							autoComplete={field.autoComplete}
							required
							className="border-input bg-card text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/30 w-full border px-4 py-2.5 text-sm transition outline-none focus:ring-2"
						/>
					</div>
				))}
			</div>
		</fieldset>
	);
}
