import type { User } from '@/types/authTypes';
import { getCsrfToken } from '@/lib/utils';
import { API_URL } from '@/config/api';

// ユーザ情報取得
export const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      credentials: 'include',
    });

    if (response.ok) return await response.json();
    if (response.status === 401) return null;
  } catch (err) {
    console.error('fetchUser error:', err);
    return null;
  }
};

// サインアップ
export const signup = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  csrfToken: string | null
) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(csrfToken && { 'X-XSRF-TOKEN': csrfToken }),
    },
    credentials: 'include',
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

  return response;
};

//　ログイン
export const login = async (email: string, password: string, csrfToken: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-XSRF-TOKEN': csrfToken,
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return response;
};

// ログアウト
export const logout = async () => {
  const csrfToken = getCsrfToken();

  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-XSRF-TOKEN': csrfToken ?? '',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Logout failed:', response.status);
  }
};
