const Newsletter = () => {
 return (
  <section className="bg-gray-100 rounded-lg p-8">
   <div className="max-w-2xl mx-auto text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
    <p className="text-gray-600 mb-6">
     Subscribe to our newsletter for exclusive offers and updates.
    </p>
    <form className="flex flex-col sm:flex-row gap-4">
     <input
      type="email"
      placeholder="Enter your email"
      className="flex-grow px-4 py-2 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
      required
     />
     <button
      type="submit"
      className="bg-purple-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
     >
      Subscribe
     </button>
    </form>
   </div>
  </section>
 );
};

export default Newsletter;
