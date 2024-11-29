import AddToBasketButton from "@/components/AddToBasketButton";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const ProductPage = async ({
 params,
}: {
 params: Promise<{ slug: string }>;
}) => {
 const { slug } = await params;
 const product: Product = await getProductBySlug(slug);
 if (!product) return notFound();
 const isOutOfStock = product.stock != null && product.stock <= 0;
 return (
  <div className="container mx-auto px-4 py-8">
   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div
     className={`relative aspect-square h-[500px] rounded-lg border shadow-sm hover:shadow-md w-full transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
    >
     {product.image && (
      <Image
       src={urlFor(product.image).url()}
       alt={product.name || "Product image"}
       className="object-contain transition-transform duration-300 hover:scale-105"
       fill
      />
     )}
     {isOutOfStock && (
      <>
       <div className="absolute inset-0  flex items-center justify-center bg-black bg-opacity-50">
        <span className="text-white font-bold text-lg">Out of stock</span>
       </div>
      </>
     )}
    </div>
    <div className="flex flex-col justify-between">
     <div>
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="text-xl font-semibold mb-4">
       &euro;{product.price?.toFixed(2)}
      </div>
      <div className="prose max-w-none mb-6">
       {Array.isArray(product.description) && (
        <PortableText value={product.description} />
       )}
      </div>
     </div>
     <div className="mt-6">
      <AddToBasketButton product={product} disabled={isOutOfStock} />
     </div>
    </div>
   </div>
  </div>
 );
};

export default ProductPage;
