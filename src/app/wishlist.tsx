"use client";

import products from "./products";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter((pid) => pid !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-pink-700">My Wishlist</h1>
      {wishlistedProducts.length === 0 ? (
        <p className="text-center text-pink-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <Image src={product.image} alt={product.name} width={180} height={180} className="rounded mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-pink-800">{product.name}</h2>
              <p className="text-pink-600 font-bold mb-4">${product.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded bg-pink-100 text-pink-700"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </button>
                <Link href={`/checkout?id=${product.id}`} className="px-4 py-2 rounded bg-pink-600 text-white">Buy Now</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link href="/" className="underline text-pink-700">Back to Shop</Link>
      </div>
    </div>
  );
} 