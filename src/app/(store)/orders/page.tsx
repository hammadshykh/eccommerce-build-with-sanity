import { Order } from "@/sanity.types";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OrderCard from "@/components/OrderCard";

export default async function Orders() {
 const { userId } = await auth();
 if (!userId) return redirect("/");

 const orders = await getMyOrders(userId);

 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
     My Orders
    </h1>
    {orders?.length === 0 ? (
     <div className="bg-white shadow rounded-lg p-6 text-center">
      <p className="text-gray-600 text-lg">
       You have not placed any orders yet.
      </p>
     </div>
    ) : (
     <div className="space-y-8">
      {orders.map((order: Order) => (
       <OrderCard key={order.orderNumber} order={order} />
      ))}
     </div>
    )}
   </div>
  </div>
 );
}
