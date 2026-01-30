import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '@/components/Heading';
import { listWishlists, removeWishlist } from '@/services/wishlistService';
import type { WishlistIndexResponse } from '@/types/wishlistType';

type WishlistProduct = WishlistIndexResponse['items'][number];

type ProductCardProps = {
  product: WishlistProduct;
  onPurchase: () => void;
  purchaseLoading: boolean;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white border shadow-sm hover:shadow-md transition p-3">
      <img
        src={(product as any).imageUrl || 'https://via.placeholder.com/150'}
        alt={(product as any).title || (product as any).name || 'product'}
        className="w-full h-32 object-cover rounded-md mb-3"
      />

      <h3 className="text-sm font-semibold text-gray-800">
        {(product as any).title || (product as any).name}
      </h3>

      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-semibold text-gray-800">
          ¥{Number((product as any).price ?? 0).toLocaleString()}
        </p>
      </div>

      {(product as any).description ? (
        <p className="text-xs text-gray-600 mt-2 leading-snug">{(product as any).description}</p>
      ) : null}
    </div>
  );
};

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistIndexResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<number | null>(null);

  const products = useMemo(() => wishlist?.items ?? [], [wishlist]);

  const fetchWishlist = async () => {
    const data = await listWishlists();
    setWishlist(data);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchWishlist();
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handlePurchase = async (productId: number) => {
    try {
      setPurchasingId(productId);

      // 1) Cartへ追加（/api/cart: POST）
      // wishlistService側にCart追加関数がない前提で、最小のfetchで実装
      const cartRes = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      if (!cartRes.ok) {
        const body = await cartRes.json().catch(() => ({}));
        throw new Error(body?.message || `Failed to add to cart (${cartRes.status})`);
      }

      // 2) Wishlistから削除
      await removeWishlist(productId);

      // 3) 再取得（total_price, count のズレ防止）
      await fetchWishlist();
    } catch (err) {
      console.error('Failed to purchase:', err);
    } finally {
      setPurchasingId(null);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">読み込み中...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <Heading>ほしい物リスト</Heading>
        <p className="text-sm text-gray-600 mt-2">購入を検討している商品の一覧です。</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">合計:</span>{' '}
            <span>¥{Number(wishlist?.total_price ?? 0).toLocaleString()}</span>
            <span className="ml-3 text-gray-500">({wishlist?.count ?? 0}件)</span>
          </div>

          <div className="flex items-center gap-3"></div>
        </div>

        <div className="mt-6 bg-white border rounded-lg shadow-sm p-6">
          {products.length === 0 ? (
            <div className="text-center text-gray-600 py-10">
              ほしい物リストに登録された商品はありません。
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="hover:opacity-90 transition"
                >
                  <ProductCard
                    product={product}
                    purchaseLoading={purchasingId === Number(product.id)}
                    onPurchase={() => handlePurchase(Number(product.id))}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
