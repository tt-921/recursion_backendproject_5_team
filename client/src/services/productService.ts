import type { Product } from "@/types/ProductType";
import { getCsrfToken } from "@/lib/utils";

const API_URL = "http://localhost:8000";

function makeError(status: number, message?: string) {
    const err: Error & { status?: number } = new Error(message || `HTTP ${status}`);
    err.status = status;
    return err;
}

export const listProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
    });

    if (res.status === 401) throw makeError(401, "Unauthorized");
    if (!res.ok) throw makeError(res.status);

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
};

export const getProduct = async (id: number | string): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
    });

    if (res.status === 401) throw makeError(401, "Unauthorized");
    if (!res.ok) throw makeError(res.status);

    const data = await res.json();
    return data && data.id ? data : data.data;
};

export const createProduct = async (payload: Partial<Product>): Promise<Product> => {
    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": getCsrfToken() ?? "",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (res.status === 401) throw makeError(401, "Unauthorized");
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw makeError(res.status, body.message || `HTTP ${res.status}`);
    }

    return await res.json();
};

export const updateProduct = async (id: number | string, payload: Partial<Product>): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": getCsrfToken() ?? "",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if (res.status === 401) throw makeError(401, "Unauthorized");
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw makeError(res.status, body.message || `HTTP ${res.status}`);
    }

    return await res.json();
};

export const deleteProduct = async (id: number | string): Promise<void> => {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": getCsrfToken() ?? "",
        },
        credentials: "include",
    });

    if (res.status === 401) throw makeError(401, "Unauthorized");
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw makeError(res.status, body.message || `HTTP ${res.status}`);
    }
    return;
};
