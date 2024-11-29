import ProductGrid from "@/components/ProductGrid";
import { searchProductByName } from "@/sanity/lib/products/searchProductByName";
import React from "react";

const SearchPage = async ({
 searchParams,
}: {
 searchParams: Promise<{ query: string }>;
}) => {
 //  console.log(searchParams?.query);
 const { query } = await searchParams;
 const products = await searchProductByName(query);
 console.log(products);
 if (!products.length) {
  return (
   <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
     <h1 className="text-3xl font-bold mb-6 text-center">
      no products found for : {query}
     </h1>
     <p className="text-gray-600 text-center">
      {" "}
      Try searching with different keywords
     </p>
    </div>
   </div>
  );
 }
 return (
  <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
   <div className="container mx-auto px-4 max-w-6xl w-full mt-4">
    <h1 className="bg-white p-4 text-4xl font-semibold text-center">
     Search result for {query}
    </h1>
    <ProductGrid products={products} />
   </div>
  </div>
 );
};

export default SearchPage;
