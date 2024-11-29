import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const oderType = defineType({
 name: "order",
 title: "Order",
 type: "document",
 icon: BasketIcon,
 fields: [
  defineField({
   name: "orderNumber",
   title: "Order Number",
   type: "string",
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "stripeCheckoutSessionId",
   title: "Stripe Checkout Session Id",
   type: "string",
  }),
  defineField({
   name: "stripeCustomerId",
   title: "Stripe Customer Id",
   type: "string",
  }),
  defineField({
   name: "clerkUserId",
   title: "Clerk User Id",
   type: "string",
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "customerName",
   title: "Customer Name",
   type: "string",
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "email",
   title: "Customer Email",
   type: "string",
   validation: (rule) => rule.required().email(),
  }),
  defineField({
   name: "stripePaymentIntentId",
   title: "Stripe Payment Intent Id",
   type: "string",
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "products",
   title: "Products",
   type: "array",
   of: [
    defineArrayMember({
     type: "object",
     fields: [
      defineField({
       name: "product",
       title: "Product Bought",
       type: "reference",
       to: [{ type: "product" }],
      }),
      defineField({
       name: "quantity",
       title: "Quantity Purchased",
       type: "number",
      }),
     ],
     preview: {
      select: {
       product: "product.name",
       quantity: "quantity",
       image: "product.image",
       price: "product.price",
      },
      prepare({ product, quantity, price, image }) {
       return {
        title: product ? `${product} x ${quantity}` : "Product details",
        subtitle: price
         ? `Total: $${(price * quantity).toFixed(2)}`
         : "Price unavailable",
        media: image,
       };
      },
     },
    }),
   ],
  }),
  defineField({
   name: "totalPrice",
   title: "Total Price",
   type: "number",
   validation: (rule) => rule.required().min(0),
  }),
  defineField({
   name: "currency",
   title: "Currency",
   type: "string",
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "ammountDiscount",
   title: "Ammount Discount",
   type: "number",
   validation: (rule) => rule.min(0),
  }),
  defineField({
   name: "status",
   title: "Order Status",
   type: "string",
   options: {
    list: [
     { title: "Pendding", value: "pendding" },
     { title: "Paid", value: "paid" },
     { title: "Shipped", value: "shipped" },
     { title: "Delivered", value: "delivered" },
     { title: "Cancelled", value: "cancelled" },
    ],
   },
  }),
  defineField({
   name: "orderDate",
   title: "Order Date",
   type: "datetime",
   validation: (rule) => rule.required(),
  }),
 ],
 preview: {
  select: {
   name: "customerName",
   ammount: "totalPrice",
   currency: "currency",
   orderId: "orderNumber",
   email: "email",
  },
  prepare(select) {
   const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
   return {
    title: `${select.name} (${orderIdSnippet})`,
    subtitle: `${select.ammount} ${select.currency} ${select.email}`,
    media: BasketIcon,
   };
  },
 },
});
