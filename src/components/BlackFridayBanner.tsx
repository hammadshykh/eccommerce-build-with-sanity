import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import React from "react";

const BlackFridayBanner = async () => {
 const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);
 if (!sale?.isActive) return null;
 return (
  <div className="bg-gradient-to-r from-red-600 to-black text-white px-4 py-3">
   <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
    <div className="mb-2 sm:mb-0">
     <h2 className="text-xl font-bold">{sale.title}</h2>
     <p className="text-sm">{sale.description}</p>
    </div>
    <div className="bg-white text-black py-2 px-4 rounded-full text-sm font-semibold">
     Use Code: <span className="text-red-600">{sale.couponCode}</span> for{" "}
     {sale.discountAmmount}% off
    </div>
   </div>
  </div>
 );
};

export default BlackFridayBanner;
