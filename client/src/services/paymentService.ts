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
    const response = await fetch(`${API_URL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({}),
      credentials: "include",
    });

    console.log('Response status:', response.status);

    const data = await response.json();

    if (!data.url) {
      console.error('Stripe Checkout URLがサーバーから返されませんでした。', data);
      alert("決済セッションの作成に失敗しました");
      return;
    }
    console.log('Response data:', data);

    //StripeのCheckoutページに斡旋
    window.location.href = data.url;

  } catch (error) {
    console.error("Stripe Checkoutエラー:", error);
    alert("決済処理でエラーが発生しました");
  }
};
