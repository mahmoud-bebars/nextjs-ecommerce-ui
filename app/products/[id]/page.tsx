import ProductPage from "@/components/products/product-page";
import { notFound } from "next/navigation";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) return notFound();

  return <ProductPage productId={id} />;
}
