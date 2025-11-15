export interface Product {
  id: number;
  title: string;
  description?: string | null;
  category_id?: number | null;
  status?: string | null;
  imageUrl?: string | null;
  created_at?: string | null;
}
