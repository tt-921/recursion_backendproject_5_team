import type { Category } from '@/types/CategoryType';
import { getCsrfToken } from '@/lib/utils';
import { API_URL } from '@/config/api';

function makeError(status: number, message?: string) {
  const err: Error & { status?: number } = new Error(message || `HTTP ${status}`);
  err.status = status;
  return err;
}

export const listCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL}/admin/categories`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) throw makeError(res.status);
  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
};

export const getCategory = async (id: number | string): Promise<Category> => {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'include',
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) throw makeError(res.status);

  const data = await res.json();
  return data && data.id ? data : data.data;
};

export const createCategory = async (payload: Partial<Category>): Promise<Category> => {
  const res = await fetch(` ${API_URL}/admin/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getCsrfToken() ?? '',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw makeError(res.status, body.message || 'HTTP ${res.status}');
  }
  return await res.json();
};

export const updateCategory = async (
  id: number | string,
  payload: Partial<Category>
): Promise<Category> => {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': getCsrfToken() ?? '',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw makeError(res.status, body.message || `HTTP ${res.status}`);
  }
  return await res.json();
};

export const deleteCategory = async (id: number | string): Promise<void> => {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'X-XSRF-TOKEN': getCsrfToken() ?? '',
    },
    credentials: 'include',
  });

  if (res.status === 401) throw makeError(401, 'Unauthorized');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw makeError(res.status, body.message || `HTTP ${res.status}`);
  }
  return;
};
