import type { OrderItem } from './OrderItemType';

export interface Order {
  id: number;
  user_id: number;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  order_items?: OrderItem[];
}
