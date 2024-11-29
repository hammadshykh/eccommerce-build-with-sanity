import { TagIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
export const salesType = defineType({
 name: "sales",
 title: "Sales",
 type: "document",
 icon: TagIcon,
 fields: [
  defineField({
   name: "title",
   title: "Sale Title",
   type: "string",
  }),
  defineField({
   name: "description",
   title: "Sale Description",
   type: "string",
  }),
  defineField({
   name: "discountAmount",
   title: "Discount Ammount",
   type: "number",
   description: "Ammount off in percentage or fixed value",
  }),
  defineField({
   name: "couponCode",
   title: "Coupon Code",
   type: "string",
  }),
  defineField({
   name: "validForm",
   title: "Valid Form",
   type: "datetime",
  }),
  defineField({
   name: "validUntil",
   title: "Valid Until",
   type: "datetime",
  }),
  defineField({
   name: "isActive",
   title: "Is Active",
   type: "boolean",
   description: "Toggle to activate/deactivate the sale",
   initialValue: true,
  }),
 ],
 preview: {
  select: {
   title: "title",
   discountAmmount: "discountAmmount",
   couponCode: "couponCode",
   isActive: "isActive",
  },
  prepare(selection) {
   const { couponCode, discountAmmount, isActive, title } = selection;
   const status = isActive ? "Active" : "Inactive";
   return {
    title,
    subtitle: `${discountAmmount}% off - Code: ${couponCode} - ${status}`,
   };
  },
 },
});
