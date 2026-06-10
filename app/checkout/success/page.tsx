import Link from "next/link";
import { BackLink } from "@/components/BackLink";
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
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl ring-8 ring-emerald-50">
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
      {!isDemo && params.session_id && (
        <p className="mt-2 text-xs text-stone-400">Reference: {params.session_id}</p>
      )}
      <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        {session?.role === "buyer" && (
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center rounded-full bg-nyuzi-emerald px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-emerald-900"
          >
            View my orders
          </Link>
        )}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-nyuzi-amber px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-nyuzi-amber-dark"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
