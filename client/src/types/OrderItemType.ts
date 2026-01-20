import type { Product } from './ProductType';

export interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_amount?: number | null;
  product?: Product | null;
}
