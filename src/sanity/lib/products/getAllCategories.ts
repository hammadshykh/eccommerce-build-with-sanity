import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

export const getAllCategories = async () => {
 const ALL_CATEGORIES_QUERY = defineQuery(`
      *[_type == "category"]`);
 try {
  // use sanity fetch to send the query
  const categories = await sanityFetch({
   query: ALL_CATEGORIES_QUERY,
  });

  // return the list of products,  or an empty array if none are found
  return categories.data || [];
 } catch (error) {
  console.error("Error fetching all categories", error);
  return [];
 }
};
