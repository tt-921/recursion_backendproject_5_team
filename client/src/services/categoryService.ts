import type { Category } from '@/types/CategoryType';
import { API_URL } from '@/config/api';

function makeError(status: number, message?: string) {
  const err: Error & { status?: number } = new Error(message || `HTTP ${status}`);
  err.status = status;
  return err;
}

export const listPublicCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
};

export const getPublicCategories = async (id: number | string): Promise<Category> => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return data && data.id ? data : data.data;
};
