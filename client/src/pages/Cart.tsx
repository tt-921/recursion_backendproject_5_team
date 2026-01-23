import { Button } from '@/components/ui/button';
import { ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface RecommendedProduct {
  id: string;
  name: string;
  description: string;
  rating: number;
  imageUrl?: string;
}

// ===== モックデータ（後でAPI呼び出しに置き換える） =====
// ダミーのカートデータ
const mockCartData: CartItem[] = [
  {
    id: '1',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    price: 18200,
    quantity: 1,
  },
  {
    id: '2',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    price: 18200,
    quantity: 1,
  },
  {
    id: '3',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    price: 18200,
    quantity: 1,
  },
  {
    id: '4',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    price: 18200,
    quantity: 1,
  },
];

// ダミーの推奨商品データ
const mockRecommendedData: RecommendedProduct[] = [
  {
    id: 'r1',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    rating: 4,
  },
  {
    id: 'r2',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    rating: 4,
  },
  {
    id: 'r3',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    rating: 4,
  },
  {
    id: 'r4',
    name: '商品名が入ります',
    description: '商品説明や値段が入ります。商品説明や値段が入ります。',
    rating: 4,
  },
];

// ===== モックAPI関数（後で実際のAPI呼び出しに置き換える） =====
/**
 * カート情報を取得する関数
 * 将来的には以下のように置き換えます：
 *
 * const fetchCartItems = async (): Promise<CartItem[]> => {
 *   const response = await fetch('/api/cart');
 *   const data = await response.json();
 *   return data.items;
 * };
 */
const fetchCartItems = async (): Promise<CartItem[]> => {
  // 実際のAPIを呼ぶような非同期処理をシミュレート
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCartData);
    }, 500); // 500msの遅延でネットワークをシミュレート
  });
};

/**
 * カートから商品を削除するAPI関数
 * 将来的には以下のように置き換えます：
 *
 * const removeCartItem = async (id: string): Promise<void> => {
 *   await fetch(`/api/cart/${id}`, { method: 'DELETE' });
 * };
 */
const removeCartItem = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`商品 ${id} を削除しました`);
      resolve();
    }, 300);
  });
};

const fetchRecommendedProducts = async (): Promise<RecommendedProduct[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockRecommendedData), 500));
};

// ===== メインコンポーネント =====
const Cart: React.FC = () => {
  // ローディング状態の管理
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<RecommendedProduct[]>([]);
  const shippingFee = 1820; // 定数として定義

  // コンポーネントマウント時にデータを取得
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // 並列でデータを取得（Promise.all を使用）
        const [cartData, recommendedData] = await Promise.all([
          fetchCartItems(),
          fetchRecommendedProducts(),
        ]);

        setCartItems(cartData);
        setRecommendedProducts(recommendedData);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        // エラーハンドリング（トースト通知などを表示）
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []); // 空の依存配列 = マウント時のみ実行

  // カートから商品を削除する関数
  const removeFromCart = async (id: string): Promise<void> => {
    try {
      // 楽観的UI更新：APIを待たずにUIを更新
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

      // バックエンドで削除
      await removeCartItem(id);
    } catch (error) {
      console.error('削除に失敗しました:', error);
      // エラー時は元に戻す処理を追加することも可能
    }
  };

  // 商品小計の計算
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee;

  // 数値を日本円フォーマットに変換
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('ja-JP');
  };

  // 星評価を生成
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* カート商品一覧 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-black pl-3">カート</h2>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">カートは空です</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    {/* 削除ボタン */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="self-start p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* 商品画像 */}
                    <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>

                    {/* 商品情報 */}
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <p className="text-sm text-gray-500">数量：{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 注文サマリー */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">商品の小計：</span>
                <span className="font-semibold">{formatCurrency(subtotal)}円</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">配送料・サービス料：</span>
                <span className="font-semibold">{formatCurrency(shippingFee)}円</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">ご請求額：</span>
                <span className="font-bold">{formatCurrency(total)}円</span>
              </div>
            </div>

            <button className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-4">
              キャンセル・ポリシーについて
              <ChevronRight className="w-4 h-4" />
            </button>

            <Button className="w-full bg-black hover:bg-gray-800 text-white py-6">
              注文を確定する
            </Button>
          </div>
        </div>
      </div>

      {/* 関連商品セクション */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6 border-l-4 border-black pl-3">
            関覧履歴に基づくおすすめ商品
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* 商品画像 */}
                <div className="w-full aspect-square bg-gray-200 rounded mb-3 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>

                {/* 商品名 */}
                <h3 className="font-bold mb-2">{product.name}</h3>

                {/* 星評価 */}
                <div className="mb-2">{renderStars(product.rating)}</div>

                {/* 商品説明 */}
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
