export function formatPrice(priceCents: number): string {
	return new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
	}).format(priceCents / 100);
}
