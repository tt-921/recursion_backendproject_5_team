import type { Product } from './ProductType';

export interface WishlistIndexResponse {
  items: Product[];
  total_price: number;
  count: number;
  is_public: boolean;
}
