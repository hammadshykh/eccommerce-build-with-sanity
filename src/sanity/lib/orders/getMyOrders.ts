import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const getMyOrders = async (userId: string) => {
 if (!userId) throw new Error("User ID is Required");

 // Define the query to get orders based on user id , sorted by orderDate descending

 const MY_ORDERS_QUERY = defineQuery(
  `*[_type == "order" && clerkUserId == "${userId}"] | order(orderDate desc) {
  ...,products[]{
  ...,
  product->}}`
 );
 try {
  // use sanity fetch to send the query
  const products = await sanityFetch({
   query: MY_ORDERS_QUERY,
   params: {
    userId,
   },
  });

  // return the list of products,  or an empty array if none are found
  return products.data || [];
 } catch (error) {
  console.error("Error fetching My Orders", error);
  return [];
 }
};
