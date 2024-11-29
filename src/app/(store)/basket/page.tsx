"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useBasketStore } from "@/store";

import { Loader2 } from "lucide-react";
import BasketItem from "@/components/BasketItem";
import OrderSummary from "@/components/OrderSummary";
import {
 createCheckoutSession,
 MetaData,
} from "../../../../actions/createCheckoutSession";

export default function BasketPage() {
 const groupedItems = useBasketStore((state) => state.getGroupItmes());
 const { isSignedIn } = useAuth();
 const { user } = useUser();
 const [isClient, setIsClient] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  setIsClient(true);
 }, []);

 if (!isClient)
  return (
   <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="h-6 w-6 animate-spin" />
   </div>
  );

 if (groupedItems.length === 0) {
  return (
   <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
    <h1 className="text-2xl font-bold mb-6">Your Basket</h1>
    <p className="text-muted-foreground text-lg">Your basket is empty</p>
   </div>
  );
 }

 const handleCheckout = async () => {
  if (!isSignedIn) return;
  setIsLoading(true);
  try {
   const metadata: MetaData = {
    orderNumber: crypto.randomUUID(),
    customerName: user?.firstName as string,
    customerEmail: user?.emailAddresses[0]?.emailAddress || "Unknown",
    clerkUserId: user?.id as string,
   };
   console.log("Metadata:", metadata);

   const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
   if (checkoutUrl) {
    console.log("Redirecting to:", checkoutUrl);
    window.location.href = checkoutUrl;
   } else {
    console.error("No checkout URL generated");
   }
  } catch (error) {
   console.error("Error creating checkout session:", error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className="container mx-auto p-4 max-w-6xl">
   <h1 className="text-2xl font-bold mb-6">Your Basket</h1>
   <div className="flex flex-col lg:flex-row gap-8">
    <div className="flex-grow space-y-4">
     {groupedItems.map((item) => (
      <BasketItem key={item.product._id} item={item} />
     ))}
    </div>
    <OrderSummary
     groupedItems={groupedItems}
     isSignedIn={isSignedIn}
     isLoading={isLoading}
     onCheckout={handleCheckout}
    />
   </div>
  </div>
 );
}
