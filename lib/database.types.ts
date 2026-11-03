export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			order_items: {
				Row: {
					created_at: string;
					id: string;
					order_id: string;
					product_id: string;
					product_name: string;
					quantity: number;
					unit_price_cents: number;
				};
				ComputedFields: never;
				Insert: {
					created_at?: string;
					id?: string;
					order_id: string;
					product_id: string;
					product_name: string;
					quantity: number;
					unit_price_cents: number;
				};
				Update: {
					created_at?: string;
					id?: string;
					order_id?: string;
					product_id?: string;
					product_name?: string;
					quantity?: number;
					unit_price_cents?: number;
				};
				Relationships: [
					{
						foreignKeyName: "order_items_order_id_fkey";
						columns: ["order_id"];
						isOneToOne: false;
						referencedRelation: "orders";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "order_items_product_id_fkey";
						columns: ["product_id"];
						isOneToOne: false;
						referencedRelation: "products";
						referencedColumns: ["id"];
					},
				];
			};
			orders: {
				Row: {
					access_token_hash: string;
					created_at: string;
					currency: string;
					customer_email: string;
					id: string;
					shipping_address_line1: string;
					shipping_address_line2: string | null;
					shipping_cents: number;
					shipping_city: string;
					shipping_country_code: string;
					shipping_name: string;
					shipping_phone: string | null;
					shipping_postal_code: string;
					shipping_region: string;
					status: string;
					stripe_payment_intent_id: string | null;
					subtotal_cents: number;
					total_cents: number;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					access_token_hash: string;
					created_at?: string;
					currency?: string;
					customer_email: string;
					id?: string;
					shipping_address_line1: string;
					shipping_address_line2?: string | null;
					shipping_cents?: number;
					shipping_city: string;
					shipping_country_code?: string;
					shipping_name: string;
					shipping_phone?: string | null;
					shipping_postal_code: string;
					shipping_region: string;
					status?: string;
					stripe_payment_intent_id?: string | null;
					subtotal_cents: number;
					total_cents: number;
					updated_at?: string;
				};
				Update: {
					access_token_hash?: string;
					created_at?: string;
					currency?: string;
					customer_email?: string;
					id?: string;
					shipping_address_line1?: string;
					shipping_address_line2?: string | null;
					shipping_cents?: number;
					shipping_city?: string;
					shipping_country_code?: string;
					shipping_name?: string;
					shipping_phone?: string | null;
					shipping_postal_code?: string;
					shipping_region?: string;
					status?: string;
					stripe_payment_intent_id?: string | null;
					subtotal_cents?: number;
					total_cents?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			products: {
				Row: {
					active: boolean;
					contents: string[];
					created_at: string;
					description: string;
					features: string[];
					id: string;
					image_paths: string[];
					name: string;
					price_cents: number;
					short_description: string;
					slug: string;
					specs: NonNullable<Json>;
					stock: number;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					active?: boolean;
					contents?: string[];
					created_at?: string;
					description: string;
					features?: string[];
					id?: string;
					image_paths?: string[];
					name: string;
					price_cents: number;
					short_description: string;
					slug: string;
					specs?: NonNullable<Json>;
					stock?: number;
					updated_at?: string;
				};
				Update: {
					active?: boolean;
					contents?: string[];
					created_at?: string;
					description?: string;
					features?: string[];
					id?: string;
					image_paths?: string[];
					name?: string;
					price_cents?: number;
					short_description?: string;
					slug?: string;
					specs?: NonNullable<Json>;
					stock?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
			stock_reservations: {
				Row: {
					created_at: string;
					expires_at: string;
					id: string;
					order_id: string;
					product_id: string;
					quantity: number;
					status: string;
				};
				ComputedFields: never;
				Insert: {
					created_at?: string;
					expires_at: string;
					id?: string;
					order_id: string;
					product_id: string;
					quantity: number;
					status?: string;
				};
				Update: {
					created_at?: string;
					expires_at?: string;
					id?: string;
					order_id?: string;
					product_id?: string;
					quantity?: number;
					status?: string;
				};
				Relationships: [
					{
						foreignKeyName: "stock_reservations_order_id_fkey";
						columns: ["order_id"];
						isOneToOne: false;
						referencedRelation: "orders";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "stock_reservations_product_id_fkey";
						columns: ["product_id"];
						isOneToOne: false;
						referencedRelation: "products";
						referencedColumns: ["id"];
					},
				];
			};
			stripe_events: {
				Row: {
					attempts: number;
					id: string;
					processed_at: string | null;
					processing_error: string | null;
					received_at: string;
					type: string;
				};
				ComputedFields: never;
				Insert: {
					attempts?: number;
					id: string;
					processed_at?: string | null;
					processing_error?: string | null;
					received_at?: string;
					type: string;
				};
				Update: {
					attempts?: number;
					id?: string;
					processed_at?: string | null;
					processing_error?: string | null;
					received_at?: string;
					type?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			consume_reservation: { Args: { p_order_id: string }; Returns: string };
			release_reservation: { Args: { p_order_id: string }; Returns: string };
			reserve_stock: {
				Args: {
					p_order_id: string;
					p_product_id: string;
					p_quantity: number;
					p_ttl?: string;
				};
				Returns: string;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	"public"
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends (DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never) = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
	TableName extends (DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never) = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
	TableName extends (DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never) = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
	EnumName extends (DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never) = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
