import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
 const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[_type == "product" && slug.current == "${slug}"] | order(name asc)[0]
    `);
 try {
  // use sanity fetch to send the query
  const product = await sanityFetch({
   query: PRODUCT_BY_ID_QUERY,
   params: {
    slug,
   },
  });

  // return the list of products,  or an empty array if none are found
  return product.data || null;
 } catch (error) {
  console.error("Error fetching product by id", error);
  return null;
 }
};
