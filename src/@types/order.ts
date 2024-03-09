export interface Order {
  id: string;
  user_id: string;
  group_id: string;

  product_name: string;
  product_slug: string;
  product_image: string | null;
  product_brand_name: string;
  product_description: string | null;
  product_quantity: number;

  product_variation_combinations: Record<string, string>;
  product_variation_discount: number;
  product_variation_price: number;

  // order statuses
  request_cancel: boolean;
  request_return: boolean;
  cancelled: boolean;
  returned: boolean;

  status:
    | "pending"
    | "confirmed"
    | "out for delivery"
    | "delivered"
    | "return approved"
    | "out for pickup"
    | "picked up"
    | "refunded";

  created_at: Date;
  updated_at: Date | null;
}

