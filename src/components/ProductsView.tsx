import React from "react";
import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import CategorySelectorComponent from "./ui/category-selector";

interface ProductsViewProps {
 products: Product[];
 categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
 return (
  <section>
   <div className="flex flex-col gap-4 sm:flex-row ">
    <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h2>
    <div className="w-full md:w-64 mb-10">
     <CategorySelectorComponent categories={categories} />
    </div>
   </div>
   <div className="flex flex-col md:flex-row gap-8">
    <div className="flex-1">
     <ProductGrid products={products} />
    </div>
   </div>
  </section>
 );
};

export default ProductsView;
