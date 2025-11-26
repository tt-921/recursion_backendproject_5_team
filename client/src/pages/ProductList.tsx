import { Link } from 'react-router-dom';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@/types/ProductType';
import type { Category } from '@/types/CategoryType';
import { listPublicProducts } from '@/services/productService';
import { listPublicCategories } from '@/services/categoryService';
import { addFavorite, removeFavorite, listFavorites } from '@/services/favoriteService';

// ページ専用 ProductCard コンポーネント
const ProductCard = ({
  title,
  description,
  imageUrl,
  rating = 4,
  isFavorite,
  onToggleFavorite,
}: {
  title: string;
  description: string;
  imageUrl: string;
  rating?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}) => {
  return (
    <div className="bg-white border shadow-sm hover:shadow-md transition p-3">
      <img
        src={imageUrl || 'https://via.placeholder.com/150'}
        alt={title}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center text-yellow-500 text-sm mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'fill-yellow-500' : 'fill-gray-200 text-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite();
          }}
          className="ml-2"
        >
          <Heart size={24} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>
      <p className="text-xs text-gray-600 mt-2 leading-snug">{description}</p>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.category_id === selectedCategoryId)
    : products;

  const handleToggleFavorite = async (productId: number) => {
    try {
      if (favoriteIds.includes(productId)) {
        await removeFavorite(productId);
        setFavoriteIds((prev) => prev.filter((id) => id !== productId));
      } else {
        await addFavorite(productId);
        setFavoriteIds((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error('お気に入りの更新に失敗しました', err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productList, categoryList, favoriteList] = await Promise.all([
          listPublicProducts(),
          listPublicCategories(),
          listFavorites().catch((e) => {
            console.error('Failed to fetch favorites', e);
            return [];
          }),
        ]);
        setProducts(productList);
        setCategories(categoryList as Category[]);
        const initialFavoriteIds = favoriteList
          .map((f) => Number((f as any).pivot?.product_id))
          .filter((n) => Number.isFinite(n));
        setFavoriteIds(initialFavoriteIds);
      } catch (err: unknown) {
        console.error(err);
        const message = err instanceof Error ? err.message : String(err);
        setError(message || 'データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedCategoryName = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId)?.name ?? 'カテゴリ'
    : 'すべての商品';

  if (loading) {
    return <div className="p-6">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">エラーが発生しました：{error}</div>;
  }

  return (
    <div className="w-full grid grid-cols-5 gap-8">
      {/* 左メニュー */}
      <div className="col-span-1 border-r border-gray-200 p-6 bg-gray-100 min-h-screen">
        <section className="mb-6">
          <Heading>商品一覧</Heading>
          <div className="grid grid-cols-1 gap-3 mt-4">
            <div>
              <Label className="text-sm text-gray-600">価格帯</Label>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <Input placeholder="下限なし" className="w-full text-sm bg-white" />
                  <span className="text-sm text-gray-600">円〜</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="上限なし" className="w-full text-sm bg-white" />
                  <span className="text-sm text-gray-600">円〜</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <Heading>カテゴリ</Heading>
          <div className="flex flex-col gap-2 mt-3">
            <Button
              variant={selectedCategoryId === null ? 'default' : 'outline'}
              className="flex-1 text-sm  text-white bg-black"
              onClick={() => setSelectedCategoryId(null)}
            >
              全て
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategoryId === category.id ? 'default' : 'outline'}
                className="flex-1 text-sm text-white bg-black"
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <Heading>レビュー</Heading>
          <div className="flex flex-col gap-2 mt-3">
            <Button variant="outline" className="text-sm">
              4.5以上
            </Button>
            <Button variant="outline" className="text-sm">
              4.0以上
            </Button>
            <Button variant="outline" className="text-sm">
              3.5以上
            </Button>
          </div>
        </section>

        <section className="mb-6">
          <Heading>商品状態</Heading>
          <div className="mt-3">
            <Button variant="outline" className="w-full text-sm">
              在庫ありのみ表示
            </Button>
          </div>
        </section>

        <section className="mb-6">
          <Heading>送料</Heading>
          <div className="mt-3">
            <Button variant="outline" className="w-full text-sm">
              送料のみ表示
            </Button>
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-3">
          <Button className="w-full bg-black text-white rounded text-sm">この表示で検索する</Button>
          <Button variant="outline" className="w-full text-sm">
            クリア
          </Button>
        </section>
      </div>

      {/* 右サイド */}
      <div className="col-span-4 min-h-screen flex flex-col">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-end">
          <span className="text-sm text-gray-700 font-medium">並び替え</span>
        </div>

        <div className="mb-4 px-4 mt-4">
          <Heading>{selectedCategoryName}</Heading>
        </div>

        {/* 商品カード */}
        <div className="bg-white p-6 grid grid-cols-4 gap-6 rounded-md flex-1">
          {filteredProducts.length === 0 ? (
            <div className="col-span-4 text-center text-gray-600">
              該当する商品が見つかりません。
            </div>
          ) : (
            filteredProducts.map((product) => {
              return (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="hover:opacity-90 transition"
                >
                  <ProductCard
                    title={product.title}
                    description={product.description}
                    imageUrl={product.imageUrl ?? 'https://via.placeholder.com/150'}
                    isFavorite={favoriteIds.includes(Number(product.id))}
                    onToggleFavorite={() => handleToggleFavorite(product.id)}
                    // rating={product.rating}
                  />
                </Link>
              );
            })
          )}
        </div>

        {/* ページネーション */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-10">
          <button className="text-sm px-3 bg-white transition cursor-pointer">&lt;</button>

          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className="text-sm w-8 h-8 flex items-center justify-center bg-white text-gray-800 hover:bg-black hover:text-white transition rounded-md"
            >
              {num}
            </button>
          ))}

          <button className="text-sm px-3 bg-white transition cursor-pointer">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
