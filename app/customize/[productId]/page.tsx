import { BackLink } from "@/components/BackLink";
import { CustomizePanel } from "@/components/customize/CustomizePanel";
import { notFound, redirect } from "next/navigation";
import { getProduct } from "@/lib/data";

interface CustomizePageProps {
  params: Promise<{ productId: string }>;
}

export default async function CustomizePage({ params }: CustomizePageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) {
    notFound();
  }

  if (product.category === "garment") {
    redirect(`/try-on/${product.id}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <BackLink href="/">Back to shop</BackLink>
      <div className="mt-6">
        <CustomizePanel product={product} />
      </div>
    </div>
  );
}
