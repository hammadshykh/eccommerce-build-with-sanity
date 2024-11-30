import BasketItem from "@/components/BasketItem";
import { formatCurrencyCustom } from "@/lib/formatCurreny";
import { Product } from "@/sanity.types";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Orders() {
 const { userId } = await auth();
 console.log(userId);
 if (!userId) return redirect("/");

 const orders = await getMyOrders(userId);
 console.log(orders);
 return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
   <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
     My Orders
    </h1>
    {orders?.length === 0 ? (
     <div className="text-center text-gray-600">
      <p>You have not placed any orderss yet.</p>
     </div>
    ) : (
     <div className="space-y-6 sm:space-y-8">
      {orders.map((order: any) => (
       <div
        key={order.orderNumber}
        className="p-4 sm:p-6 border-b border-gray-200"
       >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
         <div>
          <p className="text-sm text-gray-600 mb-1 font-bold">Order Number</p>
          <p className="bg-green-50 text-green-800 font-medium text-sm">
           {order.orderNumber}
          </p>
         </div>
         <div className="sm:text-right">
          <p className="text-sm text-gray-600 mb-1">Order Date</p>
          <p className="text-sm text-gray-600 mb-1">
           {order.orderDate
            ? new Date(order.orderDate).toLocaleDateString()
            : "N/A"}
          </p>
         </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
         <div className="flex items-center gap-2">
          <span>Status:</span>
          <span
           className={`${order.status == "paid" ? "bg-green-50 p-1 text-green-800" : "bg-gray-100 text-gray-800"}`}
          >
           {order.status}
          </span>
         </div>
         <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Total Amount</p>
          <p className="font-bold text-lg">
           {formatCurrencyCustom(order.total_price ?? 0, order.currency)}
          </p>
         </div>
        </div>

        {/* {order.amountDiscount ? ( */}
        <div className="mt-4 sm:p-4 bg-red-50 rounded-lg">
         <p className="text-red-600 font-bold mb-1 text-sm sm:text-base">
          Discount Amount:{" "}
          {formatCurrencyCustom(order.amountDiscount ?? 0, order.currency)}
         </p>
         <p className="text-sm text-gray-600">
          Original Subtotal: {order.currency}
         </p>
        </div>
        {/* ) : null} */}
        <div className="flex-grow space-y-4 mt-6">
         {order.products?.map((item: any) => (
          <BasketItem key={item.product._id} item={item} addBtn={false} />
         ))}
        </div>
       </div>
      ))}
     </div>
    )}
   </div>
  </div>
 );
}
