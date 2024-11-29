// Importing required dependencies and types
import { Product } from "./sanity.types"; // The `Product` type is imported, likely representing a product's structure in Sanity CMS.
import { create } from "zustand"; // Zustand is a lightweight state management library.
import { persist } from "zustand/middleware"; // The `persist` middleware allows saving the state to local storage.

export interface BasketItem {
 product: Product; // Each basket item contains a product object of type `Product`.
 quantity: number; // The quantity of the product in the basket.
}

interface BasketState {
 items: BasketItem[]; // Array of items in the basket.
 addItem: (product: Product) => void; // Function to add a product to the basket.
 removeItem: (productId: string) => void; // Function to remove a product from the basket by ID.
 clearBasket: () => void; // Function to clear all items from the basket.
 getTotalPrice: () => number; // Function to calculate the total price of items in the basket.
 getItemCount: (productId: string) => number; // Function to get the quantity of a specific product.
 getGroupItmes: () => BasketItem[]; // Function to get all grouped items in the basket.
}

// Creating the Zustand store with the `persist` middleware
export const useBasketStore = create<BasketState>()(
 persist(
  (set, get) => ({
   items: [], // Initial state: an empty array of basket items.

   // Function to add a product to the basket
   addItem: (product) =>
    set((state) => {
     // Check if the product already exists in the basket
     const existingItem = state.items.find(
      (item) => item.product._id == product._id
     );

     if (existingItem) {
      // If it exists, increment the quantity of the product
      return {
       items: state.items.map((item) =>
        item.product._id == product._id
         ? { ...item, quantity: item.quantity + 1 }
         : item
       ),
      };
     } else {
      // If it doesn't exist, add it to the basket with a quantity of 1
      return { items: [...state.items, { product, quantity: 1 }] };
     }
    }),

   // Function to remove a product from the basket
   removeItem: (productId) =>
    set((state) => ({
     // Reduce the basket items array:
     items: state.items.reduce((acc, item) => {
      if (item.product?._id == productId) {
       // If the product is found and its quantity is greater than 1, decrease the quantity
       if (item.quantity > 1) {
        acc.push({ ...item, quantity: item.quantity - 1 });
       }
      } else {
       // Otherwise, keep the product as is
       acc.push(item);
      }
      return acc;
     }, [] as BasketItem[]),
    })),

   // Function to clear the basket by resetting items to an empty array
   clearBasket: () => set({ items: [] }),

   // Function to calculate the total price of items in the basket
   getTotalPrice: () =>
    get().items?.reduce(
     (total, item) => total + (item.product?.price ?? 0) * item.quantity,
     0
    ),

   // Function to get the quantity of a specific product in the basket
   getItemCount: (productId) => {
    const item = get().items?.find((item) => item.product?._id == productId);
    return item ? item.quantity : 0;
   },

   // Function to get all grouped items in the basket
   getGroupItmes: () => get().items,
  }),
  {
   name: "basket-store", // Key name for the persisted state in local storage.
  }
 )
);
