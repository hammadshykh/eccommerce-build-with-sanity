"use server";

import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { BasketItem } from "@/store";

export type MetaData = {
 orderNumber: string;
 customerName: string;
 customerEmail: string;
 clerkUserId: string;
};

export type GroupedBasketItem = {
 product: BasketItem["product"];
 quantity: number;
};

export async function createCheckoutSession(
 items: GroupedBasketItem[],
 metadata: MetaData
) {
 const baseUrl =
  !process.env.VERCEL_URL == undefined
   ? `https://${process.env.VERCEL_URL}`
   : process.env.NEXT_PUBLIC_BASE_URL;

 console.log(
  "Base URL:",
  process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`
 );

 try {
  // check if any grouped items don't have a price
  const itemsWithoutPrice = items.filter((item) => !item.product.price);
  if (itemsWithoutPrice.length > 0) {
   throw new Error("Some items do not have a price");
  }

  // Search for existing customer by email
  const customers = await stripe.customers.list({
   email: metadata.customerEmail,
   limit: 1,
  });
  let customerId: string | undefined;
  if (customers.data.length > 0) {
   customerId = customers.data[0].id;
  }
  const session = await stripe.checkout.sessions.create({
   customer: customerId,
   customer_creation: customerId ? undefined : "always",
   customer_email: !customerId ? metadata.customerEmail : undefined,
   metadata,
   mode: "payment",
   allow_promotion_codes: true,
   success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
   cancel_url: `${baseUrl}/basket`,
   line_items: items.map((item) => ({
    price_data: {
     currency: "gbp",
     unit_amount: Math.round(item.product.price! * 100),
     product_data: {
      name: item.product.name || "Unamed Product",
      description: `Product ID ${item.product._id}`,
      metadata: {
       id: item.product._id,
      },
      images: item.product.image
       ? [urlFor(item.product.image).url()]
       : undefined,
     },
    },
    quantity: item.quantity,
   })),
  });
  return session.url;
 } catch (error) {
  console.log(error, ": URL ERROR");
 }
}