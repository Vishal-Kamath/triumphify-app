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

  product_variation_combinations: unknown;
  product_variation_discount: number;
  product_variation_price: number;
}

