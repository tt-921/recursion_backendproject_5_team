export interface Product {
  id: number;
  title: string;
  description: string;
  category_id?: number | null;
  status?: string | null;
  imageUrl?: string | null;
  created_at?: string | null;
}
