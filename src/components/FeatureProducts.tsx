import { Product } from "@/sanity.types";
import ProductThumb from "./ProductThumb";

const FeaturedProducts = ({ products }: { products: Product[] }) => {
 return (
  <section>
   <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {products.map((product) => (
     <ProductThumb key={product._id} product={product} />
    ))}
   </div>
  </section>
 );
};

export default FeaturedProducts;
