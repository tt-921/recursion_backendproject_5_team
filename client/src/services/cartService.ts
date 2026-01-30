import { API_URL } from "@/config/api";
import { getCsrfToken } from "@/lib/utils";

export type AddToCartPayload = {
  product_id: number;
  price_id: number;
  quantity: number;
};

export type UpdateCartPayload = {
  cart_item_id: number;
  quantity: number;
};

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Request failed");
  }
  return res.json();
};

/**
 * PSOT: 商品追加
 */
export const addToCart = async (payload: AddToCartPayload) => {
  const csrfToken = getCsrfToken();

  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'X-XSRF-TOKEN': csrfToken ?? '',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/**
 * GET: 商品取得
 */
export const getCart = async () => {
  const res = await fetch(`${API_URL}/cart`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
    },
  });

  return handleResponse(res);
};

/**
 * PUT: カート内商品の数量更新
 */
export const updateCartItem = async (payload: UpdateCartPayload) => {
  const csrfToken = getCsrfToken();

  const res = await fetch(`${API_URL}/cart`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": csrfToken ?? "",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/**
 * DELETE: カート内の商品削除
 */
export const deleteCartItem = async (cart_item_id: number) => {
  const csrfToken = getCsrfToken();

  const res = await fetch(`${API_URL}/cart`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-XSRF-TOKEN": csrfToken ?? "",
    },
    body: JSON.stringify({ cart_item_id }),
  });

  return handleResponse(res);
};