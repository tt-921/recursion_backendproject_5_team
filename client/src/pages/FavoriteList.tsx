import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Heading from '@/components/Heading';
import { listFavorites, removeFavorite, addFavorite } from '@/services/favoriteService';
import { Heart, Star } from 'lucide-react';
import type { FavoriteProduct } from '@/types/FavoriteType';

const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
}: {
  product: FavoriteProduct;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => {
  return (
    <div className="bg-white border shadow-sm hover:shadow-md transition p-3">
      <img
        src={product.imageUrl || 'https://via.placeholder.com/150'}
        alt={product.title}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h3 className="text-sm font-semibold text-gray-800">{product.title}</h3>

      <div className="flex items-center justify-between mt-1">
        <div className="flex text-yellow-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < 4 ? 'fill-yellow-500' : 'fill-gray-200 text-gray-300'}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="ml-2"
        >
          <Heart size={24} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-2 leading-snug">{product.description}</p>
    </div>
  );
};

const FavoritePage = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const list = await listFavorites();

        const ids = list.map((f) => Number(f.pivot?.product_id)).filter((n) => Number.isFinite(n));

        setFavoriteProducts(list as any[]);
        setFavoriteIds(ids);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (productId: number) => {
    try {
      const isFav = favoriteIds.includes(productId);
      if (isFav) {
        await removeFavorite(productId);
        setFavoriteIds((prev) => prev.filter((id) => id !== productId));
      } else {
        await addFavorite(productId);
        setFavoriteIds((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  if (loading) {
    return (
      <>
        <div className="p-10 text-center">読み込み中...</div>
      </>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <Heading>お気に入り</Heading>
          <p className="text-sm text-gray-600 mt-2">お気に入りに登録した商品一覧です。</p>

          <div className="mt-6 bg-white border rounded-lg shadow-sm p-6">
            {favoriteProducts.length === 0 ? (
              <div className="text-center text-gray-600 py-10">
                お気に入りに登録された商品はありません。
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="hover:opacity-90 transition"
                  >
                    <ProductCard
                      product={product}
                      isFavorite={favoriteIds.includes(product.id)}
                      onToggleFavorite={() => handleToggleFavorite(product.id)}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritePage;
