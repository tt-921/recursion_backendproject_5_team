export type CartItem = {
  id: number;
  product_id: number;
  price_id: number;
  quantity: number;
  product_title?: string;
  unit_amount?: number;
};

export type Cart = {
  id: number;
  user_id: number | null;
  cart_token: string;
  items: CartItem[];
};
