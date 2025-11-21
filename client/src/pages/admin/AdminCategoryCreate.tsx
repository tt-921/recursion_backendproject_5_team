import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCategory } from '@/services/admin/categoryService';

const AdminCategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('カテゴリ名を入力してください');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: name.trim(),
      };
      await createCategory(payload);
      navigate('/admin/categories');
    } catch (err: unknown) {
      console.log(err);
      const status = (err as { status?: number })?.status;
      if (status === 401) {
        navigate('/login');
        return;
      }
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || '作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading>カテゴリ登録</Heading>
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
            <Button type="submit" disabled={loading}>
              登録
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

export default AdminCategoryCreate;
