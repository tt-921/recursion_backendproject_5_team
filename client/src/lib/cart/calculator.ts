import type { CartItem } from "@/types/cartType";

export const calculateCartTotals = (
  cartItems: CartItem[],
  shippingFee: number
) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const unitAmount = item.unit_amount ?? 0;
    return sum + unitAmount * item.quantity;
  }, 0);

  const total = subtotal + shippingFee;

  return { subtotal, total };
};

export const calculateTax = (subtotal: number, taxRate: number = 0.1) => {
  return Math.round(subtotal * taxRate);
};

export const formatCurrency = (
  amount: number,
  locale: string = "ja-JP"
): string => {
  return amount.toLocaleString(locale);
};