"use client";

import products from "../products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("wishlist");
      if (stored) setWishlist(JSON.parse(stored));
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter((pid) => pid !== id);
    setWishlist(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen theme-bg py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-8 theme-text-primary">My Wishlist</h1>
      {wishlistedProducts.length === 0 ? (
        <p className="text-center theme-text-secondary">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {wishlistedProducts.map((product) => (
            <div key={product.id} className="theme-card-hover rounded-2xl p-5 flex flex-col items-center relative">
              <SparklesIcon className="w-5 h-5 theme-text-secondary absolute top-3 left-3" />
              <Image src={product.image} alt={product.name} width={120} height={120} className="rounded mb-2 theme-border border transition-all" />
              <h2 className="text-sm font-semibold mb-1 theme-text-primary text-center">{product.name}</h2>
              <p className="text-xs theme-text-secondary font-bold mb-3">${product.price.toFixed(2)}</p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded-full border-2 flex items-center gap-1 text-xs theme-button-secondary border-pink-600 hover:bg-pink-700 transition-all"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <HeartIcon className="w-4 h-4" /> Remove
                </button>
                <Link href={`/checkout?id=${product.id}`} className="px-3 py-1 rounded-full theme-button font-semibold text-xs theme-shadow hover:bg-pink-600 transition-all">Buy</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link href="/" className="underline theme-text-primary hover:text-pink-600 dark:hover:text-pink-400 transition-all">Back to Shop</Link>
      </div>
    </div>
  );
} 