import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { formatCustomizationSummary } from "@/lib/format-customization";
import { formatPrice } from "@/lib/format";
import { getBuyerOrders, getProduct } from "@/lib/data";
import { productHrefFromProduct } from "@/lib/product-routes";
import { getSession } from "@/lib/auth";
import type { BuyerOrderWithDetails } from "@/types/database";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  fulfilled: "bg-stone-200 text-stone-700",
  cancelled: "bg-red-100 text-red-800",
} as const;

export default async function BuyerOrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "buyer") {
    redirect("/");
  }

  const orders = await getBuyerOrders(session.id);
  const active = orders.filter(
    (o) => o.status === "pending" || o.status === "paid"
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionEyebrow>Your orders</SectionEyebrow>
          <h1 className="font-display mt-2 text-3xl font-semibold text-nyuzi-ink">
            Custom-fit orders
          </h1>
          <p className="mt-2 text-nyuzi-muted">
            Track measurements and fulfillment status for pieces you&apos;ve ordered.
          </p>
        </div>
        <Link
          href="/#shop"
          className="text-sm font-semibold text-amber-700 hover:underline"
        >
          Continue shopping →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">Total orders</p>
          <p className="mt-1 text-3xl font-bold text-stone-900">{orders.length}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">In progress</p>
          <p className="mt-1 text-3xl font-bold text-amber-700">{active}</p>
        </div>
      </div>

      <section className="mt-10">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-medium text-stone-700">No orders yet</p>
            <p className="mt-2 text-stone-500">
              Browse the shop, try on a garment, and place your first custom-fit order.
            </p>
            <Link
              href="/#shop"
              className="mt-6 inline-flex rounded-full bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

async function OrderCard({ order }: { order: BuyerOrderWithDetails }) {
  const product = await getProduct(order.product_id);
  const productLink = product
    ? productHrefFromProduct(product)
    : "/#shop";

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
          <OrderThumbnail productId={order.product_id} alt={order.product_name} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Link
                href={productLink}
                className="font-semibold text-stone-900 hover:text-amber-700"
              >
                {order.product_name}
              </Link>
              <p className="text-sm text-stone-500">by {order.artisan_name}</p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}
            >
              {order.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-stone-600">
            Customization: {formatCustomizationSummary(order.customization_snapshot)}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-semibold text-emerald-800">
              {formatPrice(order.amount_cents)}
            </span>
            <span className="text-stone-400">
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

async function OrderThumbnail({ productId, alt }: { productId: string; alt: string }) {
  const product = await getProduct(productId);

  if (!product) {
    return <div className="flex h-full w-full items-center justify-center text-xs text-stone-400">—</div>;
  }

  return (
    <Image
      src={product.image_url}
      alt={alt}
      fill
      className="object-cover"
      sizes="80px"
    />
  );
}
