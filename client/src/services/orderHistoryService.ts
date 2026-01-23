import type { Order } from '@/types/OrderType';
import { API_URL } from '@/config/api';

function makeError(status: number, message?: string) {
  const err: Error & { status?: number } = new Error(message || `HTTP ${status}`);
  err.status = status;
  return err;
}

export const listOrderHistory = async (): Promise<Order[]> => {
  const res = await fetch(`${API_URL}/order_history`, {
    method: 'GET',
    headers: { Accept: `application/json` },
    credentials: 'include',
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
};
