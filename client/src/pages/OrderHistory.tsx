import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Heading from '@/components/Heading';
import { Package, ReceiptText } from 'lucide-react';
import { listOrderHistory } from '@/services/orderHistoryService';
import type { Order } from '@/types/OrderType';
import type { OrderItem } from '@/types/OrderItemType';

const formatYmdHm = (iso?: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${y}/${m}/${day} ${hh}:${mm}`;
};

const yen = (v: number) => {
  try {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(v);
  } catch {
    return `${v}円`;
  }
};

const OrderItemRow = ({ item }: { item: OrderItem }) => {
  const product = item.product;
  const productId = product?.id;

  return (
    <Link
      to={`/products/${productId}`}
      className="flex gap-3 p-3 rounded-md hover:bg-gray-50 transition"
    >
      <img
        src={(product as any)?.imageUrl || 'https://via.placeholder.com/150'}
        alt={(product as any)?.title}
        className="w-16 h-16 object-cover rounded-md border"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {(product as any)?.title}
            </p>
            {(product as any)?.description ? (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {(product as any).description}
              </p>
            ) : null}
          </div>

          <div className="text-right shrink-0">
            <p className="text-xs text-gray-600">数量</p>
            <p className="text-sm font-semibold text-gray-800">{item.quantity}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-600">
            単価: {item.unit_amount != null ? yen(item.unit_amount) : '—'}
          </p>
          <p className="text-xs text-gray-600">
            小計: {item.unit_amount != null ? yen(item.unit_amount * item.quantity) : '—'}
          </p>
        </div>
      </div>
    </Link>
  );
};

const OrderCard = ({ order }: { order: Order }) => {
  const items = order.order_items ?? [];
  const total =
    (order as any).total_amount != null
      ? (order as any).total_amount
      : items.reduce((sum, it) => {
          const qty = it.quantity;
          const unit = it.unit_amount == null ? 0 : it.unit_amount;
          return sum + qty * unit;
        }, 0);

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">注文 #{order.id}</p>
            <p className="text-xs text-gray-600 mt-1">
              注文日時: {formatYmdHm(order.created_at || order.updated_at)}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xs text-gray-600">ステータス</p>
            <p className="text-sm font-semibold text-gray-800">{order.status || '—'}</p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xs text-gray-600">合計</p>
            <p className="text-sm font-semibold text-gray-800">{yen(total)}</p>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-600 text-sm">注文商品の情報がありません。</div>
        ) : (
          items.map((it) => (
            <OrderItemRow key={it.id ?? `${order.id}-${it.product_id}`} item={it} />
          ))
        )}
      </div>
    </div>
  );
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await listOrderHistory();
        if (!mounted) return;
        setOrders(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!mounted) return;
        if (e?.status === 401) {
          setError('ログインが必要です。');
        } else {
          setError('購入履歴の取得に失敗しました。');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-10 text-center">読み込み中...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2">
          <Heading>購入履歴</Heading>
        </div>

        <p className="text-sm text-gray-600 mt-2">過去の注文一覧です。</p>

        <div className="mt-6 bg-white border rounded-lg shadow-sm p-6">
          {error ? (
            <div className="text-center text-red-600 py-10">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-600 py-10">購入履歴はありません。</div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <ReceiptText className="h-4 w-4" />
                  <span>注文件数: {orders.length}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Package className="h-4 w-4" />
                  <span>詳細は商品をクリック</span>
                </div>
              </div>

              {orders.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
