import type { Product } from '@/types/ProductType';
import type { SearchResult } from '@/types/SearchResultType';
import { API_URL } from '@/config/api';

function makeError(status: number, message?: string) {
  const err: Error & { status?: number } = new Error(message || `HTTP ${status}`);
  err.status = status;
  return err;
}

export const listPublicProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
};

export const getPublicProduct = async (id: number | string): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return data && data.id ? data : data.data;
};

export const searchProductsBy = async (term: string): Promise<SearchResult> => {
  const res = await fetch(`${API_URL}/products/search?keyword=${encodeURIComponent(term)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return data;
};