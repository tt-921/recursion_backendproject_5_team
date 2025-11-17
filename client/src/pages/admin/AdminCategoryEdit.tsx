import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCategory, updateCategory } from '@/services/admin/categoryService';

const AdminCategoryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const c = await getCategory(id);
        setName(c.name || '');
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg || '取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: name.trim(),
      };

      await updateCategory(id, payload);
      navigate('/admin/categories');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || '保存に失敗しました');
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
        <Heading>カテゴリ編集</Heading>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-sm max-w-2xl">
        {error && <div className="text-red-600 mb-3">{error}</div>}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label>カテゴリ名</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="カテゴリ名を入力してください"
            />
          </div>

          <div className="flex items-center gap-3 mt-2">
            <Button type="submit" disabled={saving}>
              保存
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              キャンセル
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCategoryEdit;
