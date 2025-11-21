import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import type { Category as CategoryType } from '@/types/CategoryType';
import { listCategories, deleteCategory } from '@/services/admin/categoryService';

const AdminCategoryList = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await listCategories();
      setCategories(list);
    } catch (err: unknown) {
      console.error(err);
      const status = (err as { status?: number })?.status;
      if (status === 401) {
        navigate('/login');
        return;
      }
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('本当にこのカテゴリを削除しますか？')) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      console.error(err);
      const status = (err as { status?: number })?.status;
      if (status === 401) {
        navigate('/login');
        return;
      }
      alert('削除に失敗しました。コンソールを確認してください。');
    }
  };

  const filtered = categories;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Heading>カテゴリ管理</Heading>
        <div className="flex items-center gap-2">
          <Link to="/admin/categories/create">
            <Button className="flex items-center gap-2" variant="default">
              <Plus /> 登録
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-md overflow-x-auto">
        <table className="w-full table-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">カテゴリ名</th>
              <th className="px-4 py-3">作成日</th>
              <th className="px-4 py-3">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  読み込み中...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-red-600">
                  エラー: {error}
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-600">
                  カテゴリが見つかりません。
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-3 align-top">{c.id}</td>
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium">{c.name}</div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {c.created_at ? new Date(c.created_at).toLocaleString() : '-'}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/categories/${c.id}/edit`}>
                        <Button className="flex items-center gap-2" variant="outline" size="sm">
                          <Edit /> 編集
                        </Button>
                      </Link>
                      <Button
                        className="flex items-center gap-2"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash /> 削除
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoryList;
