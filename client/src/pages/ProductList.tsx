import { Link } from "react-router-dom";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

// ページ専用 ProductCard コンポーネント
const ProductCard = ({
  title,
  description,
  imageUrl,
  rating,
}: {
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
}) => {
  return (
    <div className="bg-white border shadow-sm hover:shadow-md transition p-3">
      <img
        src={imageUrl || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-32 object-cover rounded-md mb-3"
      />
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>

      <div className="flex items-center text-yellow-500 text-sm mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-500" : "fill-gray-200 text-gray-300"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-600 mt-2 leading-snug">{description}</p>
    </div>
  );
};

const ProductList = () => {
  const products = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: `商品名が入ります`,
    description:
      "商品説明や値段が入ります。商品説明や値段が入ります。",
    imageUrl: "",
    rating: Math.floor(Math.random() * 5) + 1,
  }));

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
                  <Input
                    placeholder="下限なし"
                    className="w-full text-sm bg-white"
                  />
                  <span className="text-sm text-gray-600">円〜</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="上限なし"
                    className="w-full text-sm bg-white"
                  />
                  <span className="text-sm text-gray-600">円〜</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <Heading>カテゴリ</Heading>
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              className="flex-1 text-sm text-white bg-black"
            >
              カテゴリ名
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-sm text-white bg-black"
            >
              カテゴリ名
            </Button>
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
          <Button className="w-full bg-black text-white rounded text-sm">
            この表示で検索する
          </Button>
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
          <Heading>カテゴリ名</Heading>
        </div>

        {/* 商品カード */}
        <div className="bg-white p-6 grid grid-cols-4 gap-6 rounded-md flex-1">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="hover:opacity-90 transition"
            >
              <ProductCard
                title={product.title}
                description={product.description}
                imageUrl={product.imageUrl}
                rating={product.rating}
              />
            </Link>
          ))}
        </div>

        {/* ページネーション */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-10">
          <button className="text-sm px-3 bg-white transition cursor-pointer">
            &lt;
          </button>

          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className="text-sm w-8 h-8 flex items-center justify-center bg-white text-gray-800 hover:bg-black hover:text-white transition rounded-md"
            >
              {num}
            </button>
          ))}

          <button className="text-sm px-3 bg-white transition cursor-pointer">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
