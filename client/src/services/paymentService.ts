import { API_URL} from '@/config/api';

const getCsrfToken = (): string | null => {
  const csrfCookie = document.cookie.split('; ').find(row => row.trim().startsWith('XSRF-TOKEN='));
  if (csrfCookie) {
    const token = decodeURIComponent(csrfCookie.split('=')[1]);
    return token;
  }
  return null;
};

export const StripeCheckout = async () => {
  try {
    // Tokenを取得
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      return;
    }

    // カート情報や注文情報はサーバー側で取得することを想定
    const response = await fetch(`${API_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({}),
      credentials: "include",
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      if (response.status === 401 || response.status === 419) {
        alert("ログインすると決済できます");
      } else if (response.status === 400 || response.status === 422) {
        alert("カート内容を確認してください");
      } else if (response.status >= 500) {
        alert("サーバーエラーが発生しました。時間をおいて再度お試しください");
      } else {
        alert("決済処理に失敗しました");
      }
      return;
    }

    const data = await response.json();

    //StripeのCheckoutページに斡旋
    window.location.href = data.url;

  } catch (error) {
    console.error("Stripe Checkoutエラー:", error);
    alert("決済処理でエラーが発生しました");
  }
};
