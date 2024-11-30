import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductThumb = ({ product }: { product: Product }) => {
 const isOutOfStock = product.stock != null && product.stock <= 0;
 return (
  <Link
   href={`/product/${product.slug?.current}`}
   className={`group flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${isOutOfStock ? "opacity-75" : ""}`}
  >
   <div className="relative aspect-square w-full overflow-hidden">
    {product.image && (
     <Image
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      src={urlFor(product.image).url()}
      alt={product.name || "Product Image"}
      fill
      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
     />
    )}
    {isOutOfStock && (
     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <span className="text-white font-bold text-lg">Out of Stock</span>
     </div>
    )}
   </div>
   <div className="p-4">
    <h2 className="text-lg font-semibold text-gray-800 truncate">
     {product.name}
    </h2>
    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
     {product.description || "No description available"}
    </p>
    <p className="mt-2 text-xl font-bold text-purple-600">
     &euro;{product.price?.toFixed(2)}
    </p>
   </div>
  </Link>
 );
};

export default ProductThumb;
