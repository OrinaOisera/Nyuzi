import Link from "next/link";
import { getProduct } from "@/lib/data";
import { getSession } from "@/lib/auth";

interface SuccessPageProps {
  searchParams: Promise<{ demo?: string; productId?: string; session_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const isDemo = params.demo === "1";
  const product = params.productId ? await getProduct(params.productId) : null;
  const session = await getSession();

  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <div className="pointer-events-none absolute inset-0 mesh-hero opacity-60" />
      <div className="relative max-w-lg">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-nyuzi-emerald text-4xl text-white shadow-xl shadow-emerald-900/20 ring-8 ring-emerald-50">
          ✓
        </div>
        <h1 className="font-display mt-8 text-3xl font-semibold text-nyuzi-ink sm:text-4xl">
          {isDemo ? "Demo order placed!" : "Thank you for your order!"}
        </h1>
        <p className="mt-4 leading-relaxed text-nyuzi-muted">
          {product ? (
            <>
              Your custom-fit <strong className="text-nyuzi-ink">{product.name}</strong> by{" "}
              <strong className="text-nyuzi-ink">{product.artisan.display_name}</strong> has been
              received.
            </>
          ) : (
            "Your custom-fit order has been received."
          )}
        </p>
        {isDemo && (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-nyuzi-amber ring-1 ring-amber-100">
            Demo mode — add Stripe keys in <code className="font-mono">.env.local</code> for real
            payments.
          </p>
        )}
        {!session && (
          <p className="mt-4 text-sm text-nyuzi-muted">
            <Link href="/login" className="font-semibold text-nyuzi-amber hover:underline">
              Sign in as Demo Buyer
            </Link>{" "}
            to track this order.
          </p>
        )}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {session?.role === "buyer" && (
            <Link
              href="/account/orders"
              className="inline-flex items-center justify-center rounded-full bg-nyuzi-emerald px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-emerald-900"
            >
              View my orders
            </Link>
          )}
          <Link
            href="/#shop"
            className="inline-flex items-center justify-center rounded-full bg-nyuzi-amber px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-nyuzi-amber-dark"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
