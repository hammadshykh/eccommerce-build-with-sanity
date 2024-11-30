import Link from "next/link";

const HeroSection = () => {
 return (
  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
   <div className="container mx-auto px-4 py-16 md:py-24">
    <div className="max-w-3xl">
     <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Discover Your Style
     </h1>
     <p className="text-xl md:text-2xl mb-8">
      Explore our curated collection of trendsetting products.
     </p>
     <Link
      href="/products"
      className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-opacity-90 transition duration-300"
     >
      Shop Now
     </Link>
    </div>
   </div>
  </div>
 );
};

export default HeroSection;
