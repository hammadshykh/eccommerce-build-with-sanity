import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
 name: "product",
 title: "Product",
 type: "document",
 icon: TrolleyIcon,
 fields: [
  defineField({
   name: "name",
   title: "Product Name",
   type: "string",
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "slug",
   title: "Slug",
   type: "slug",
   options: {
    source: "name", // Automatically generates slug based on the name
    maxLength: 96,
   },
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "image",
   title: "Product Image",
   type: "image",
   options: {
    hotspot: true, // Enables image cropping and focusing
   },
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: "description",
   title: "Description",
   type: "text",
   validation: (rule) => rule.required().min(10).max(500), // Description between 10 and 500 characters
  }),
  defineField({
   name: "price",
   title: "Price",
   type: "number",
   validation: (rule) => rule.required().positive().precision(2), // Validates positive numbers with up to 2 decimal places
  }),
  defineField({
   name: "categories",
   title: "Categories",
   type: "array",
   of: [{ type: "reference", to: { type: "category" } }], // Allows multiple category selections
   validation: (rule) => rule.required().min(1), // Requires at least one category
  }),
  defineField({
   name: "stock",
   title: "Stock Quantity",
   type: "number",
   validation: (rule) => rule.min(0), // Ensures positive integers
  }),
 ],
 preview: {
  select: {
   title: "name",
   media: "image",
   price: "price",
  },
  prepare(select) {
   return {
    title: select.title,
    subtitle: `$${select.price}`,
    media: select.media,
   };
  },
 },
});
