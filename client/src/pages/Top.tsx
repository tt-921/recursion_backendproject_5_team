import Heading from '@/components/Heading';
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '../components/ui/skeleton';
import Carousel from '../components/ui/carousel';
import { listPublicProducts } from '@/services/productService';
import { listPublicCategories } from '@/services/categoryService';
import type { Category } from '@/types/CategoryType';
import type { Product } from '@/types/ProductType';

type CarouselImage = string;
const images: CarouselImage[] = [];

const ProductImage: React.FC<{ src?: string | null; alt: string }> = ({ src, alt }) => {
  if (!src) {
    return (
      <div className="h-[100px] w-[100px] rounded bg-gray-200 mx-auto flex items-center justify-center text-[10px] text-gray-500">
        画像がありません
      </div>
    );
  }
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-[100px] w-[100px] mx-auto">
      {!loaded && <Skeleton className="absolute inset-0 rounded-md" data-slot="skeleton" />}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full rounded object-cover transition-opacity"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        draggable={false}
        loading="lazy"
      />
    </div>
  );
};

const CategoryImage: React.FC<{ src?: string | null; name: string }> = ({ src, name }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-[96px] w-[96px] rounded bg-gray-100 flex items-center justify-center">
      {!src && (
        <>
          <Skeleton className="absolute inset-0 rounded bg-gray-200" />
          <span className="z-10 text-[10px] text-gray-500">画像がありません</span>
        </>
      )}
      {src && (
        <>
          {!loaded && <Skeleton className="absolute inset-0 rounded" data-slot="skeleton" />}
          <img
            src={src}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover rounded transition-opacity"
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={() => setLoaded(true)}
            draggable={false}
            loading="lazy"
          />
        </>
      )}
      <span
        className="absolute bottom-2 left-1/2 -translate-x-1/2
                 text-[11px] font-semibold text-center 
                 text-black rounded px-2 py-0.5"
      >
        {' '}
        {name}
      </span>
    </div>
  );
};

function Top() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);

        const list = await listPublicProducts();
        const mapped: Product[] = list.map((p: any) => ({
          id: p.id ?? p.slug ?? '',
          title: p.title ?? p.name ?? '商品',
          imageUrl: p.thumbnail_url ?? p.imageUrl ?? null,
        }));
        setProducts(mapped);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setProductsError(e?.message ?? 'failed to fetch products');
      } finally {
        setProductsLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);
        const list = await listPublicCategories();
        const mapped: Category[] = list.map((c: any) => ({
          id: c.id ?? c.slug ?? '',
          name: c.name ?? '',
          imageUrl: c.imageUrl ?? c.thumbnail_url ?? null,
        }));
        setCategories(mapped);
      } catch (e: any) {
        if (e?.name !== 'AbortError')
          setCategoriesError(e?.message ?? 'failed to fetch categories');
      } finally {
        setCategoriesLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="mx-auto container p-6">
        <section className="mb-8">
          {images.length > 0 ? (
            <Carousel images={images} height="h-[220px]" />
          ) : (
            <div className="w-full h-[220px] bg-gray-400 flex items-center justify-center text-white text-sm">
              画像がありません
            </div>
          )}
        </section>

        {/* 注目のおすすめ商品 */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <Heading>注目のおすすめ商品</Heading>
            <Button variant="ghost" className="text-sm">
              もっと見る
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {productsLoading && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="min-w-[120px]">
                    <div className="h-[100px] w-[100px] rounded bg-gray-200 mx-auto" />
                    <div className="h-4 w-20 bg-gray-200 mt-2 mx-auto rounded" />
                  </div>
                ))}
              </>
            )}
            {!productsLoading && productsError && (
              <div className="text-sm text-red-600">商品の取得に失敗しました: {productsError}</div>
            )}
            {!productsLoading &&
              !productsError &&
              products.map((p) => (
                <div key={p.id} className="min-w-[120px]">
                  <a
                    href={`/products/${p.id}`}
                    aria-label={`${p.title} の詳細へ`}
                    className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 rounded"
                  >
                    <ProductImage src={p.imageUrl} alt={p.title} />
                    <p className="text-center text-sm mt-2">{p.title}</p>
                  </a>
                </div>
              ))}
          </div>
        </section>

        {/* カテゴリから探す */}
        <section className="mb-10">
          <div className="mb-4">
            <Heading>カテゴリから探す</Heading>
          </div>

          <div className="grid grid-cols-6 gap-4 mb-6">
            {categoriesLoading && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <Skeleton className="h-[72px] w-[72px] rounded" />
                    <Skeleton className="h-4 w-16 mt-2" />
                  </div>
                ))}
              </>
            )}
            {!categoriesLoading && categoriesError && (
              <div className="col-span-6 text-sm text-red-600">
                カテゴリの取得に失敗しました: {categoriesError}
              </div>
            )}
            {!categoriesLoading &&
              !categoriesError &&
              categories.map((c) => (
                <a
                  key={c.id}
                  href={`/categories/${c.id}`}
                  className="flex flex-col items-center hover:opacity-80 transition-opacity"
                >
                  <CategoryImage src={c.imageUrl} name={c.name} />
                </a>
              ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {categoriesLoading && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full flex items-center justify-between text-sm py-2 border-b"
                  >
                    <Skeleton className="h-4 w-24" />
                    <ChevronRight size={16} />
                  </div>
                ))}
              </>
            )}
            {!categoriesLoading && categoriesError && (
              <div className="col-span-3 text-sm text-red-600">
                カテゴリの取得に失敗しました: {categoriesError}
              </div>
            )}
            {!categoriesLoading &&
              !categoriesError &&
              categories.map((category) => (
                <a
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="w-full flex items-center justify-between text-sm py-2 border-b hover:bg-gray-50 transition-colors"
                >
                  <span className="text-black hover:underline">{category.name}</span>
                  <ChevronRight size={16} />
                </a>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Top;
