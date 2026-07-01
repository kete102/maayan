import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  paypal_order_id: string;
  paypal_transaction_id: string;
  status: string;
  payer_name: string;
  payer_email: string;
  amount: number;
  currency: string;
  items: OrderItem[];
  shipping_name: string;
  shipping_city: string;
  shipping_postal: string;
  created_at: string;
};
