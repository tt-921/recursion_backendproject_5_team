import type { WishlistIndexResponse } from '@/types/wishlistType';
import { getCsrfToken } from '@/lib/utils';
import { API_URL } from '@/config/api';

function makeError(status: number, message?: string) {
  const err: Error & { status?: number } = new Error(message || `HTTP ${status}`);
  err.status = status;
  return err;
}

export const listWishlists = async (): Promise<WishlistIndexResponse> => {
  const res = await fetch(`${API_URL}/wishlist`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return data;
};

export const addWishlist = async (productId: number): Promise<WishlistIndexResponse> => {
  const res = await fetch(`${API_URL}/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getCsrfToken() ?? '',
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

export const removeWishlist = async (productId: number): Promise<void> => {
  const res = await fetch(`${API_URL}/wishlist`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getCsrfToken() ?? '',
    },
    credentials: 'include',
    body: JSON.stringify({ product_id: productId }),
  });

  if (res.status === 401) {
    throw makeError(401, 'Unauthorized');
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw makeError(res.status, body.message || `HTTP ${res.status}`);
  }
};
