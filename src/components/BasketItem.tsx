"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import AddToBasketButton from "@/components/AddToBasketButton";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/sanity.types";

interface BasketItemProps {
 item: {
  product: Product;
  quantity: number;
 };
}

export default function BasketItem({ item }: BasketItemProps) {
 const router = useRouter();

 return (
  <Card>
   <CardContent className="p-4 flex items-center justify-between">
    <div
     className="flex items-center cursor-pointer flex-1 min-w-0"
     onClick={() => router.push(`/product/${item.product.slug.current}`)}
    >
     <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
      {item.product.image && (
       <Image
        src={urlFor(item.product.image).url()}
        alt={item.product.name || "Product image"}
        className="w-full h-full object-cover rounded"
        width={96}
        height={96}
       />
      )}
     </div>
     <div className="min-w-0">
      <h2 className="text-lg sm:text-xl font-semibold truncate">
       {item.product.name}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground">
       Price €{((item.product.price ?? 0) * item.quantity).toFixed(2)}
      </p>
     </div>
    </div>
    <div className="flex items-center ml-4 flex-shrink-0">
     <AddToBasketButton product={item.product} />
    </div>
   </CardContent>
  </Card>
 );
}
