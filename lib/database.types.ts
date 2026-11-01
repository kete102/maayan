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
					specs: Json;
					stock: number;
					updated_at: string;
				};
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
					specs?: Json;
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
					specs?: Json;
					stock?: number;
					updated_at?: string;
				};
				Relationships: [];
			};
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
};
