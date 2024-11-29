import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

const BlackFridayBanner = async () => {
 const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);
 if (!sale?.isActive) return null;
 return (
  <div className="bg-gradient-to-r   from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
   <div className="container mx-auto flex flex-col items-start justify-between">
    <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4 ">
     {sale.title}
    </h2>
    <p className="text-xl sm:text-3xl font-semibold mb-6 text-left ">
     {sale.description}
    </p>
    <div className="flex">
     <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition  duration-300">
      <span>Use Code:</span>
      <span className="text-red-600">{sale.couponCode}</span>
      <span className="ml-2 font-bold sm:tex-lg text-base">
       for {sale.discountAmmount}% of
      </span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default BlackFridayBanner;
