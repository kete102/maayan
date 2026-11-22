import type { Database } from "@/lib/database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
