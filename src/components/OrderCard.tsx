import { formatCurrencyCustom } from "@/lib/formatCurreny";
import { Order } from "@/sanity.types";
import BasketItem from "./BasketItem";
import { GroupedBasketItem } from "../../actions/createCheckoutSession";

interface OrderCardProps {
 order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
 return (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
   <div className="p-6 border-b border-gray-200">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
     <div>
      <p className="text-sm font-medium text-gray-500 mb-1">Order Number</p>
      <p className="text-lg font-semibold text-gray-900">{order.orderNumber}</p>
     </div>
     <div className="mt-2 sm:mt-0 sm:text-right">
      <p className="text-sm font-medium text-gray-500 mb-1">Order Date</p>
      <p className="text-gray-900">
       {order.orderDate
        ? new Date(order.orderDate).toLocaleDateString("en-US", {
           year: "numeric",
           month: "long",
           day: "numeric",
          })
        : "N/A"}
      </p>
     </div>
    </div>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
     <div className="flex items-center">
      <span className="text-sm font-medium text-gray-500 mr-2">Status:</span>
      <span
       className={`px-2 py-1 text-xs font-semibold rounded-full ${
        order.status === "paid"
         ? "bg-green-100 text-green-800"
         : "bg-gray-100 text-gray-800"
       }`}
      >
       {order.status}
      </span>
     </div>
     <div className="mt-2 sm:mt-0 sm:text-right">
      <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
      <p className="text-2xl font-bold text-gray-900">
       {formatCurrencyCustom(order.total_price ?? 0, order.currency)}
      </p>
     </div>
    </div>
   </div>

   {order.amountDiscount && order.amountDiscount > 0 && (
    <div className="px-6 py-4 bg-red-50">
     <p className="text-sm font-medium text-red-800 mb-1">
      Discount Applied:{" "}
      {formatCurrencyCustom(order.amountDiscount, order.currency)}
     </p>
     <p className="text-xs text-gray-600">
      Original Subtotal:{" "}
      {formatCurrencyCustom(
       (order.total_price ?? 0) + order.amountDiscount,
       order.currency
      )}
     </p>
    </div>
   )}

   <div className="px-6 py-4 space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Items</h3>
    {order.products?.map((item: GroupedBasketItem) => (
     <BasketItem key={item.product._id} item={item} addBtn={false} />
    ))}
   </div>
  </div>
 );
};

export default OrderCard;
