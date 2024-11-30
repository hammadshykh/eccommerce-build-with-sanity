"use client";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ProductThumb from "./ProductThumb";

const ProductGrid = ({ products }: { products: Product[] }) => {
 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
   {products?.map((product) => (
    <AnimatePresence key={product._id}>
     <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
     >
      <ProductThumb key={product._id} product={product} />
     </motion.div>
    </AnimatePresence>
   ))}
  </div>
 );
};

export default ProductGrid;
