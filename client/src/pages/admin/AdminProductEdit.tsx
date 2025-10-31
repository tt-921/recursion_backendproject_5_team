import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProduct, updateProduct } from "@/services/productService";

const AdminProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const p = await getProduct(id);
        setTitle(p.title || "");
        setDescription(p.description || "");
        setCategoryId(p.category_id ? String(p.category_id) : "");
        setStatus(p.status || "");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg || "取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        category_id: categoryId ? Number(categoryId) : null,
        status: status || null,
      };

      await updateProduct(id, payload);
      navigate("/admin/products");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">読み込み中...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading>商品編集</Heading>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm max-w-2xl">
        {error && <div className="text-red-600 mb-3">{error}</div>}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>商品名</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <Label>説明</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>カテゴリID</Label>
              <Input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} type="number" />
            </div>

            <div>
              <Label>ステータス</Label>
              <Input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="公開/下書き など" />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Button type="submit" disabled={saving}>
              保存
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              キャンセル
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductEdit;
