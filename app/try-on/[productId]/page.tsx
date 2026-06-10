import { BackLink } from "@/components/BackLink";
import { notFound } from "next/navigation";
import { TryOnPanel } from "@/components/TryOnPanel";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <BackLink href="/">Back to shop</BackLink>
      <div className="mt-6">
        <TryOnPanel product={product} />
      </div>
    </div>
  );
}
