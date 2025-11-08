import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from "lucide-react";
import Heading from "@/components/Heading";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedQty, setSelectedQty] = useState("1");

  // ーーーー仮データーーーーー
  const product = {
    id,
    name: "高品質レザーバッグ",
    category: "バッグ",
    price: 12800,
    rating: 4,
    shipping: "送料無料",
    description:
      "上質なレザーを使用したハンドメイドバッグ。ビジネスからカジュアルまで幅広く活用できます。長く使うほど味わいが出るアイテムです。",
    images: ["", "", "", ""],
  };

  const products = {
    production: "日本",
    size: "約45cm * 100cm",
    supplier: "〇〇株式会社",
    material: "木製",
    weight: "5.3kg",
    content: "1個",
  };

  const prodctDesciptions = {
    product_detail:
      "商品の詳細がここに描かれます。商品説明、使用方法、注意点などの情報を記載できます。",
    about_seller:
      "文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。",
    shipping_info:
      "文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。",
    handling_item:
      "文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。文章が入ります。",
  };

  const suggestItems = [
    {
      id: 1,
      name: "レザーポーチ",
      rating: 5,
      image: "",
      description: "手のひらサイズで持ち運びに便利なレザーポーチ。",
    },
    {
      id: 2,
      name: "本革キーケース",
      rating: 4,
      image: "",
      description: "上質な革を使用した耐久性の高いキーケースです。",
    },
    {
      id: 3,
      name: "ミニショルダーバッグ",
      rating: 5,
      image: "",
      description: "軽量で日常使いに最適なショルダーバッグ。",
    },
    {
      id: 4,
      name: "カードホルダー",
      rating: 4,
      image: "",
      description: "スタイリッシュなデザインのカード収納ケース。",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "山田 太郎",
      image: "",
      rating: 5,
      text: "とても高品質で、期待以上の商品でした！毎日使っています。",
    },
    {
      id: 2,
      name: "佐藤 花子",
      image: "",
      rating: 4,
      text: "デザインが素敵で、使い勝手も良いです。もう少し軽いと嬉しいかも。",
    },
    {
      id: 3,
      name: "John Doe",
      image: "",
      rating: 5,
      text: "Perfect craftsmanship. Worth every penny!",
    },
    {
      id: 4,
      name: "田中 一郎",
      image: "",
      rating: 4,
      text: "丈夫で長持ちしそうです。友人にもおすすめします。",
    },
    {
      id: 5,
      name: "Lisa",
      image: "",
      rating: 5,
      text: "Beautiful bag! The leather texture feels amazing.",
    },
    {
      id: 6,
      name: "高橋 亮",
      image: "",
      rating: 4,
      text: "サイズもちょうどよく、仕事用に重宝しています。",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(2);
  const handleShowMore = () => setVisibleCount((prev) => prev + 2);

  return (
    <div className="w-full bg-white py-10">
      {/* --- 1. メインエリア --- */}
      <section className="max-w-6xl mx-auto grid grid-cols-2 gap-10">
        {/* 左：画像 */}
        <div className="flex gap-4">
          <div className="flex-1">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-md border"
            />
          </div>
          <div className="flex flex-col justify-between">
            {product.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${i + 1}`}
                className="w-30 h-30 object-cover rounded-md border cursor-pointer hover:opacity-80"
              />
            ))}
          </div>
        </div>

        {/* 右：商品情報 */}
        <div className="flex flex-col justify-between max-w-md w-full">
          <div>
            <p className="text-sm text-gray-500">{product.category}</p>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <p className="text-xl font-semibold text-gray-900">
                ¥{product.price.toLocaleString()}{" "}
                <span className="text-sm text-gray-600">（税込）</span>
              </p>
              <span className="text-sm font-medium">{product.shipping}</span>

              {/* 星評価 */}
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 数量 + 購入ボタン */}
            <div className="mt-6 flex items-center gap-4">
              <p className="text-sm text-gray-600 mb-1">数量</p>
              <div className="w-full flex-1">
                <Select onValueChange={setSelectedQty} defaultValue={selectedQty}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full bg-black text-white text-sm mt-1 py-5 hover:bg-gray-800">
              購入する
            </Button>

            {/* 商品概要 */}
            <div className="mt-10 pt-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                商品概要
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. 商品詳細セクション --- */}
      <section className="max-w-6xl mx-auto p-8 mt-10 grid grid-cols-2 gap-10">
        {/* 左側：商品詳細 */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">商品説明</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            商品の詳細がここに描かれます。商品説明、使用方法、注意点などの情報を記載できます。
          </p>
        </div>

        {/* 右側：2行6列のテーブル */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <tbody>
              <tr>
                <td className="bg-gray-100 p-2 border-b border-gray-200 font-medium w-1/3">
                  生産地
                </td>
                <td className="p-2 border-b border-gray-200">
                  {products.production}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-100 p-2 border-b border-gray-200 font-medium">
                  サイズ
                </td>
                <td className="p-2 border-b border-gray-200">{products.size}</td>
              </tr>
              <tr>
                <td className="bg-gray-100 p-2 border-b border-gray-200 font-medium">
                  販売元
                </td>
                <td className="p-2 border-b border-gray-200">
                  {products.supplier}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-100 p-2 border-b border-gray-200 font-medium">
                  素材
                </td>
                <td className="p-2 border-b border-gray-200">
                  {products.material}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-100 p-2 border-b border-gray-200 font-medium">
                  重量
                </td>
                <td className="p-2 border-b border-gray-200">
                  {products.weight}
                </td>
              </tr>
              <tr>
                <td className="bg-gray-100 p-2 border-b border-gray-200 font-medium">
                  内容
                </td>
                <td className="p-2 border-b border-gray-200">
                  {products.content}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- 3. 販売元について --- */}
      <section className="max-w-6xl mx-auto p-8 mt-10 gap-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">販売元について</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {prodctDesciptions.about_seller}
        </p>
      </section>

      {/* --- 4. 配送について --- */}
      <section className="max-w-6xl mx-auto p-8 mt-10 gap-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">配送について</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {prodctDesciptions.shipping_info}
        </p>
      </section>

      {/* --- 5. 取り扱いについて --- */}
      <section className="max-w-6xl mx-auto p-8 mt-10 gap-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">取り扱いについて</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {prodctDesciptions.handling_item}
        </p>
      </section>

      {/* --- 6. カスタマーレビュー --- */}
      <section className="max-w-6xl mx-auto p-8 mt-10 gap-10">
        <Heading>カスタマーレビュー</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.slice(0, visibleCount).map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 p-5 bg-white"
            >
              {/* 1段目：ユーザー情報 */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.image}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <span className="font-medium text-gray-800">{review.name}</span>
              </div>

              {/* 2段目：星評価 */}
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* 3段目：レビュー本文 */}
              <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        {/* もっと見るボタン */}
        {visibleCount < reviews.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              すべてのレビューを見る
            </button>
          </div>
        )}
      </section>

      {/* --- 7. よく一緒に購入されている商品 --- */}
      <section className="max-w-6xl mx-auto p-8 mt-10 gap-10">
        <Heading>よく一緒に購入されている商品</Heading>

        {/* 推薦商品リスト */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {suggestItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 p-4 shadow-sm bg-white flex flex-col items-center"
            >
              {/* 商品画像 */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />

              {/* 商品名 */}
              <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">
                {item.name}
              </h3>

              {/* 星評価 */}
              <div className="flex justify-center mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < item.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* 商品説明 */}
              <p className="text-sm text-gray-600 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
