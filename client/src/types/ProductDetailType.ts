export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  category_id?: number | null;
  status?: string | null;
  released_at?: string | null;
  price?: number | null;
}

export interface ProductDetailResponse {
  data: ProductDetail;
  meta: {
    is_wishlisted: boolean;
  };
}
