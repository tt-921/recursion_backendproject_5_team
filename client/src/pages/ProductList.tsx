import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductList = () => {
  return (
    <div className="w-full grid grid-cols-5 gap-8">
      {/* ソート選択　左メニュー */}
      <div className="col-span-1 border-r border-gray-200 p-6 bg-gray-100 min-h-screen">
        {/* 商品一覧 */}
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

        {/* カテゴリ */}
        <section className="mb-6">
          <Heading>カテゴリ</Heading>
          <div className="flex gap-2 mt-3">
            <Button variant="outline" className="flex-1 text-sm text-white bg-black">
              カテゴリ名
            </Button>
            <Button variant="outline" className="flex-1 text-sm text-white bg-black">
              カテゴリ名
            </Button>
          </div>
        </section>

        {/* レビュー */}
        <section className="mb-6">
          <Heading>レビュー</Heading>
          <div className="flex flex-col gap-2 mt-3">
            <Button variant="outline" className="text-sm">4.5以上</Button>
            <Button variant="outline" className="text-sm">4.0以上</Button>
            <Button variant="outline" className="text-sm">3.5以上</Button>
          </div>
        </section>

        {/* 商品状態 */}
        <section className="mb-6">
          <Heading>商品状態</Heading>
          <div className="mt-3">
            <Button variant="outline" className="w-full text-sm">
              在庫ありのみ表示
            </Button>
          </div>
        </section>

        {/* 送料 */}
        <section className="mb-6">
          <Heading>送料</Heading>
          <div className="mt-3">
            <Button variant="outline" className="w-full text-sm">
              送料のみ表示
            </Button>
          </div>
        </section>

        {/* 検索ボタン */}
        <section className="mt-8 flex flex-col gap-3">
          <Button className="w-full bg-black text-white rounded text-sm">
            この表示で検索する
          </Button>
          <Button variant="outline" className="w-full text-sm">
            クリア
          </Button>
        </section>
      </div>

      {/* 右サイド：見出し + 商品グリッド */}
      <div className="col-span-4 min-h-screen flex flex-col">
        {/* 並び替えバー */}
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex justify-end">
            <span className="text-sm text-gray-700 font-medium">並び替え</span>
        </div>


        {/* 見出し */}
        <div className="mb-4 px-4 mt-4">
          <Heading>カテゴリ名</Heading>
        </div>

        {/* 商品グリッド */}
        <div className="bg-white p-6 grid grid-cols-4 gap-6 rounded-md flex-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border rounded-md h-40 flex items-center justify-center text-gray-500 text-sm"
            >
              商品 {i + 1}
            </div>
          ))}
        </div>

        {/* ページネーション */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-10">
          <Button variant="outline" className="text-sm px-3">&lt;</Button>

          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="text-sm w-8 h-8 flex items-center justify-center text-white bg-black"
            >
              {num}
            </Button>
          ))}

          <Button variant="outline" className="text-sm px-3">&gt;</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
