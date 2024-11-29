import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductByCategory } from "@/sanity/lib/products/getProductByCategory";

export default async function CategoryPage({
 params,
}: {
 params: Promise<{ slug: string }>;
}) {
 const { slug } = await params;
 console.log(slug);
 const products = await getProductByCategory(slug);
 const categories = await getAllCategories();
 console.log(products);
 return (
  <div>
   <BlackFridayBanner />
   <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
    <ProductsView products={products} categories={categories} />
   </div>
  </div>
 );
}
