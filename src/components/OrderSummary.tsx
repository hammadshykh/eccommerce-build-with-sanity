import { SignInButton } from "@clerk/nextjs";
import { BasketItem, useBasketStore } from "@/store";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface OrderSummaryProps {
 groupedItems: BasketItem[];
 isSignedIn: boolean | undefined;
 isLoading: boolean;
 onCheckout: () => void;
}

export default function OrderSummary({
 groupedItems,
 isSignedIn,
 isLoading,
 onCheckout,
}: OrderSummaryProps) {
 return (
  <Card className="w-full lg:w-80 lg:sticky lg:top-4 h-fit">
   <CardHeader>
    <CardTitle>Order Summary</CardTitle>
   </CardHeader>
   <CardContent className="space-y-2">
    <div className="flex justify-between">
     <span>Items:</span>
     <span className="font-semibold">
      {groupedItems.reduce((total, item) => total + item.quantity, 0)}
     </span>
    </div>
    <div className="flex justify-between text-2xl font-bold pt-2">
     <span>Total:</span>
     <span>€{useBasketStore.getState().getTotalPrice().toFixed(2)}</span>
    </div>
   </CardContent>
   <CardFooter>
    {isSignedIn ? (
     <Button onClick={onCheckout} disabled={isLoading} className="w-full">
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isLoading ? "Processing..." : "Checkout"}
     </Button>
    ) : (
     <SignInButton mode="modal">
      <Button className="w-full">Sign in to Checkout</Button>
     </SignInButton>
    )}
   </CardFooter>
  </Card>
 );
}
