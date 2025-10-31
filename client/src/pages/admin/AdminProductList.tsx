import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Plus } from "lucide-react";
import type { Product as ProductType } from "@/types/ProductType";
import { listProducts, deleteProduct } from "@/services/productService";


const AdminProductList = () => {
	const [products, setProducts] = useState<ProductType[]>([]);
		const [loading, setLoading] = useState<boolean>(true);
		const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const fetchProducts = async () => {
		setLoading(true);
		setError(null);
		try {
			const list = await listProducts();
			setProducts(list);
		} catch (err: unknown) {
			console.error(err);
			const status = (err as { status?: number })?.status;
			if (status === 401) {
				navigate("/login");
				return;
			}
			const message = err instanceof Error ? err.message : String(err);
			setError(message || "Failed to fetch products");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDelete = async (id: number) => {
		if (!confirm("本当にこの商品を削除しますか？")) return;
		try {
			await deleteProduct(id);
			setProducts((prev) => prev.filter((p) => p.id !== id));
		} catch (err: unknown) {
			console.error(err);
			const status = (err as { status?: number })?.status;
			if (status === 401) {
				navigate("/login");
				return;
			}
			alert("削除に失敗しました。コンソールを確認してください。");
		}
	};

	// show all products (no search/filter)
	const filtered = products;

	return (
		<div className="container mx-auto p-6">
			<div className="flex items-center justify-between mb-6">
				<Heading>商品管理</Heading>
				<div className="flex items-center gap-2">
					<Link to="/admin/products/create">
						<Button className="flex items-center gap-2" variant="default">
							<Plus /> 登録
						</Button>
					</Link>
				</div>
			</div>

			<div className="bg-white shadow rounded-md overflow-x-auto">
				<table className="w-full text-sm">
					<thead className="bg-gray-50 text-left">
						<tr>
							<th className="px-4 py-3">ID</th>
							<th className="px-4 py-3">商品名</th>
							<th className="px-4 py-3">カテゴリID</th>
							<th className="px-4 py-3">ステータス</th>
							<th className="px-4 py-3">作成日</th>
							<th className="px-4 py-3">操作</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={6} className="p-6 text-center text-gray-500">
									読み込み中...
								</td>
							</tr>
						) : error ? (
							<tr>
								<td colSpan={6} className="p-6 text-center text-red-600">
									エラー: {error}
								</td>
							</tr>
						) : filtered.length === 0 ? (
							<tr>
								<td colSpan={6} className="p-6 text-center text-gray-600">
									商品が見つかりません
								</td>
							</tr>
						) : (
							filtered.map((p) => (
								<tr key={p.id} className="border-t">
									<td className="px-4 py-3 align-top">{p.id}</td>
									<td className="px-4 py-3 align-top">
										<div className="font-medium">{p.title}</div>
										{p.description && (
											<div className="text-xs text-gray-600 mt-1">
												{p.description}
											</div>
										)}
									</td>
									<td className="px-4 py-3 align-top">{p.category_id ?? "-"}</td>
									<td className="px-4 py-3 align-top">{p.status ?? "-"}</td>
									<td className="px-4 py-3 align-top">{p.created_at ? new Date(p.created_at).toLocaleString() : "-"}</td>
									<td className="px-4 py-3 align-top">
										<div className="flex items-center gap-2">
											<Link to={`/admin/products/${p.id}/edit`}>
												<Button size="sm" variant="outline" className="flex items-center gap-2">
													<Edit /> 編集
												</Button>
											</Link>
											<Button size="sm" variant="destructive" onClick={() => handleDelete(p.id)}>
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

export default AdminProductList;

