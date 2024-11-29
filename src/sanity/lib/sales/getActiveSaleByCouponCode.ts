import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
 const ACTIVE_SALE_BY_COUPON_CODE_QUERY = defineQuery(`
    *[_type == "sales"
    && isActive == true
    && couponCode == $couponCode
  ] | order(validForm desc)[0]`);
 try {
  // use sanity fetch to send the query
  const activeSale = await sanityFetch({
   query: ACTIVE_SALE_BY_COUPON_CODE_QUERY,
   params: {
    couponCode,
    // pass the couponCode as a query parameter
   },
  });

  // return the list of products,  or an empty array if none are found
  return activeSale ? activeSale.data : null;
 } catch (error) {
  console.error("Error fetching active sale by coupon code", error);
  return [];
 }
};
