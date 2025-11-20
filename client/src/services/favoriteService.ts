import type { Favorite } from '@/types/FavoriteType';
// import { getCsrfToken } from '@/lib/utils';
import { API_URL } from '@/config/api';

function makeError(status: number, message?: string) {
  const err: Error & { status?: number } = new Error(message || `HTTP ${status}`);
  err.status = status;
  return err;
}

export const listFavorites = async (): Promise<Favorite[]> => {
  const res = await fetch(`${API_URL}/favorites`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
};

export const addFavorite = async (productId: number | string): Promise<Favorite> => {
  const res = await fetch(`${API_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // 'X-XSRF-TOKEN': getCsrfToken() ?? '',
    },
    credentials: 'include',
    body: JSON.stringify({ product_id: productId }),
  });
  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw makeError(res.status, body.message || `HTTP ${res.status}`);
  }
  return await res.json();
};

export const removeFavorite = async (productId: number | string): Promise<void> => {
  const res = await fetch(`${API_URL}/favorites/${productId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      // 'X-XSRF-TOKEN': getCsrfToken() ?? '',
    },
    credentials: 'include',
  });

  if (res.status === 401) {
    throw makeError(401, 'Unauthorized');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw makeError(res.status, body.message || `HTTP ${res.status}`);
  }

  return await res.json();
};
