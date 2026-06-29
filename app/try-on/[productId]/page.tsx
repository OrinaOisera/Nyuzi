import { BackLink } from "@/components/BackLink";
import { TryOnWorkspace } from "@/components/TryOnWorkspace";
import { notFound, redirect } from "next/navigation";
import { getProduct } from "@/lib/data";

interface TryOnPageProps {
  params: Promise<{ productId: string }>;
}

export default async function TryOnPage({ params }: TryOnPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  if (product.category !== "garment") {
    redirect(`/customize/${product.id}`);
  }

  return (
    <div className="min-h-screen bg-nyuzi-cream text-nyuzi-ink">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <BackLink href="/#shop">Back to shop</BackLink>
        <TryOnWorkspace product={product} />
      </div>
    </div>
  );
}
