import BlackFridayBanner from "@/components/BlackFridayBanner";
import FeaturedProducts from "@/components/FeatureProducts";
import HeroSection from "@/components/HeroSection";
import Newsletter from "@/components/NewsLetter";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Product() {
 const products = await getAllProducts();
 const categories = await getAllCategories();
 const featuredProducts = products.slice(0, 4); // Assuming you want to feature the first 4 products

 return (
  <div className="min-h-screen bg-gray-50">
   <BlackFridayBanner />
   <HeroSection />
   <div className="container mx-auto px-4 py-12 space-y-16">
    <FeaturedProducts products={featuredProducts} />
    <ProductsView products={products} categories={categories} />
    <Newsletter />
   </div>
  </div>
 );
}
