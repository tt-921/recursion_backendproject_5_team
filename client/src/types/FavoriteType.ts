import type { Product } from './ProductType';

// favorites テーブル1行分（中間テーブルのレコード）
export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
  created_at?: string | null;
  updated_at?: string | null;
}
// /favorites のレスポンスに含まれる pivot 部分
export interface FavoritePivot {
  user_id: number;
  product_id: number;
  created_at: string | null;
  updated_at: string | null;
}

// /favorites のレスポンス1件分（Product + pivot）
export type FavoriteProduct = Product & {
  pivot: FavoritePivot;
};
