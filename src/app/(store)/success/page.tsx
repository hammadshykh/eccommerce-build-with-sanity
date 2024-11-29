"use client";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { useBasketStore } from "@/store";
import { useEffect } from "react";

export default function PaymentSuccess() {
 const { clearBasket } = useBasketStore();

 useEffect(() => {
  clearBasket();
 }, []);
 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
   <Card className="w-full max-w-2xl">
    <CardHeader className="text-center">
     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Check className="w-10 h-10 text-green-600" />
     </div>
     <CardTitle className="text-2xl font-bold text-green-600">
      Payment Successful!
     </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
     <p className="text-center text-gray-600">
      Thank you for your purchase. Your order has been received and is being
      processed.
     </p>
     <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Order Details</h3>
      <p>Order Number: #12345</p>
      <p>Total Amount: $99.99</p>
     </div>
     <div className="text-center">
      <p className="font-semibold">Estimated Delivery</p>
      <p className="text-gray-600">
       Your order will be delivered within 3-5 business days.
      </p>
     </div>
    </CardContent>
    <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
     <Button asChild>
      <Link href="/orders">
       <ShoppingBag className="mr-2 h-4 w-4" /> View Order
      </Link>
     </Button>
     <Button asChild variant="outline">
      <Link href="/">
       Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
     </Button>
    </CardFooter>
   </Card>
  </div>
 );
}
