export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  category_id?: number | null;
  status?: string | null;
  released_at?: string | null;
  default_price: {
    id: number;
    unit_amount: number;
    stripe_price_id: string;
  };
}

export interface ProductDetailResponse {
  data: ProductDetail;
  meta: {
    is_wishlisted: boolean;
  };
}
