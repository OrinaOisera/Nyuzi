import Link from "next/link";
import { redirect } from "next/navigation";
import { OrderStatusSelect } from "@/components/OrderStatusSelect";
import { formatCustomizationSummary } from "@/lib/format-customization";
import { formatPrice } from "@/lib/format";
import { getArtisanOrders } from "@/lib/data";
import { getSession } from "@/lib/auth";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  fulfilled: "bg-stone-200 text-stone-700",
  cancelled: "bg-red-100 text-red-800",
} as const;

export default async function ArtisanDashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "artisan" || !session.artisanId) {
    redirect("/");
  }

  const orders = await getArtisanOrders(session.artisanId);
  const pending = orders.filter((o) => o.status === "pending" || o.status === "paid").length;
  const revenue = orders
    .filter((o) => o.status === "paid" || o.status === "fulfilled")
    .reduce((sum, o) => sum + o.amount_cents, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-800">Artisan dashboard</p>
          <h1 className="mt-1 text-3xl font-bold text-stone-900">{session.fullName}</h1>
          <p className="mt-1 text-stone-600">Manage custom-fit orders from your Nyuzi shop.</p>
        </div>
        {session.artisanSlug && (
          <Link
            href={`/artisan/${session.artisanSlug}`}
            className="text-sm font-semibold text-amber-700 hover:underline"
          >
            View public profile →
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Total orders</p>
          <p className="mt-1 text-3xl font-bold text-stone-900">{orders.length}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Active orders</p>
          <p className="mt-1 text-3xl font-bold text-amber-700">{pending}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Revenue</p>
          <p className="mt-1 text-3xl font-bold text-emerald-800">{formatPrice(revenue)}</p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-stone-900">Orders</h2>
        {orders.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-12 text-center text-stone-500">
            No orders yet. Share your artisan profile to attract buyers.
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Product</th>
                    <th className="px-4 py-3 font-medium">Buyer</th>
                    <th className="px-4 py-3 font-medium">Customization</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Update</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/80">
                      <td className="px-4 py-4 font-medium text-stone-900">
                        {order.product_name}
                      </td>
                      <td className="px-4 py-4 text-stone-600">{order.buyer_name}</td>
                      <td className="px-4 py-4 text-stone-600">
                        {formatCustomizationSummary(order.customization_snapshot)}
                      </td>
                      <td className="px-4 py-4 font-medium text-emerald-800">
                        {formatPrice(order.amount_cents)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <OrderStatusSelect orderId={order.id} status={order.status} />
                      </td>
                      <td className="px-4 py-4 text-stone-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
