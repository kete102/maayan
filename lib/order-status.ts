export const ORDER_STATUS = {
	PENDING_PAYMENT: "pending_payment",
	PAID: "paid",
	PAYMENT_FAILED: "payment_failed",
	CANCELLED: "cancelled",
	FULFILLED: "fulfilled",
	REFUNDED: "refunded",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const STOCK_RESERVATION_STATUS = {
	ACTIVE: "active",
	CONSUMED: "consumed",
	RELEASED: "released",
} as const;

export type StockReservationStatus =
	(typeof STOCK_RESERVATION_STATUS)[keyof typeof STOCK_RESERVATION_STATUS];
