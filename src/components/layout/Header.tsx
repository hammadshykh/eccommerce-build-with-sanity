"use client";
import { ClerkLoaded, SignInButton, useClerk, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { TrolleyIcon } from "@sanity/icons";
import { PackageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useBasketStore } from "@/store";

const Header = () => {
 const { user } = useClerk();
 const router = useRouter();
 const itemCount = useBasketStore((state) =>
  state.items.reduce((total, item) => total + item.quantity, 0)
 );
 const [query, setQuery] = useState("");

 const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setQuery(value);

  // Update the URL query parameters dynamically
  const params = new URLSearchParams(window.location.search);
  if (value) {
   params.set("query", value);
  } else {
   params.delete("query");
  }
  router.push(`?${params.toString()}`);
 };

 const createClerkPassKey = async () => {
  try {
   const response = await user?.createPasskey();
   console.log(response);
  } catch (error) {
   console.error("Error", JSON.stringify(error, null, 2));
  }
 };

 return (
  <header className="flex flex-wrap justify-between items-center px-4 py-2">
   {/* top row */}
   <div className="flex w-full flex-wrap justify-between items-center">
    <Link
     href="/"
     className="text-2xl font-bold hover:opacity-50 cursor-pointer text-blue-500 mx-auto sm:mx-0"
    >
     Shop
    </Link>
    <form
     action="/search"
     className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
    >
     <input
      type="text"
      name="query"
      placeholder="Search for products"
      onChange={handlechange}
      value={query}
      className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
     />
    </form>
    <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
     <Link
      href="/basket"
      className="flex-1 relative flex justify-center text-center rounded py-2 px-4 text-white items-center space-x-2 bg-blue-500 hover:bg-blue-600"
     >
      <TrolleyIcon className="w-6 h-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
       {itemCount}
      </span>
      <span>My Basket</span>
     </Link>
     {/* user area */}
     <ClerkLoaded>
      {user && (
       <Link
        href="/orders"
        className="flex-1 relative flex justify-center text-center rounded py-2 px-4 text-white items-center space-x-2 bg-blue-500 hover:bg-blue-600"
       >
        <PackageIcon className="w-6 h-6" />
        <span>My Orders</span>
       </Link>
      )}
      {user ? (
       <div className="flex items-center space-x-2">
        <UserButton />
        <div className="hidden sm:block text-xs">
         <p className="text-gray-400">Welcome Back</p>
         <p className="font-bold">{user.firstName}</p>
        </div>
       </div>
      ) : (
       <SignInButton mode="modal" />
      )}
      {user?.passkeys.length === 0 && (
       <button
        onClick={createClerkPassKey}
        className="bg-white sm:block hidden hover:bg-blue-700 hover:opacity-50 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
       >
        Create PassKey
       </button>
      )}
     </ClerkLoaded>
    </div>
   </div>
  </header>
 );
};

export default Header;
