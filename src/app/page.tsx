"use client";
import Image from "next/image";
import Link from "next/link";
import products from "./products";
import { useState, useEffect } from "react";
import { HeartIcon, SparklesIcon, BeakerIcon, UserIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

export default function Home() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  const toggleWishlist = (id: number) => {
    let updated: number[];
    if (wishlist.includes(id)) {
      updated = wishlist.filter((pid) => pid !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  function handleBuyClick(product: { id: number; name: string; price: number; image: string; category: string; icon: string; emoji: string; }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen theme-bg pb-10 px-4">
      {/* Hero Banner */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between theme-hero-gradient rounded-3xl theme-shadow-lg p-8 mb-12 mt-8 gap-8 theme-border border transition-all">
        <div className="flex-1 flex flex-col items-start justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold theme-text-primary mb-4 leading-tight">Dazzling Beauty</h2>
          <p className="text-lg md:text-xl theme-text-secondary mb-6 max-w-md">Discover luxurious skincare, makeup, and fragrance essentials. Shop the latest beauty trends and exclusive offers!</p>
          <Link href="#products" className="px-6 py-3 rounded-full theme-button font-bold text-lg theme-shadow hover:bg-pink-600 transition-all">Shop Now</Link>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex gap-4">
            <Image src="/file.svg" alt="Beauty Product 1" width={120} height={120} className="rounded-xl theme-shadow theme-card border transition-all" />
            <Image src="/window.svg" alt="Beauty Product 2" width={120} height={120} className="rounded-xl theme-shadow theme-card border transition-all" />
            <Image src="/globe.svg" alt="Beauty Product 3" width={120} height={120} className="rounded-xl theme-shadow theme-card border transition-all" />
          </div>
        </div>
      </section>
      {/* Category Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all
              ${selectedCategory === cat 
                ? "theme-button border-green-600" 
                : "theme-card theme-text-primary theme-border hover:bg-pink-100 dark:hover:bg-gray-700"}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Product Grid */}
      <h1 className="text-2xl font-bold text-center mb-8 theme-text-primary" id="products">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {filteredProducts.map((product) => (
          <div key={product.id} className="theme-card-hover rounded-2xl p-5 flex flex-col items-center relative">
            <Image src={product.image} alt={product.name} width={120} height={120} className="rounded mb-2 theme-border border transition-all" />
            <h2 className="text-sm font-semibold mb-1 theme-text-primary text-center">{product.name}</h2>
            <p className="text-xs theme-text-secondary font-bold mb-3">${product.price.toFixed(2)}</p>
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-full border-2 flex items-center gap-1 text-xs transition-all ${wishlist.includes(product.id) 
                  ? "theme-button-secondary border-pink-600" 
                  : "theme-card theme-text-secondary theme-border hover:bg-green-100 dark:hover:bg-gray-700"}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <HeartIcon className="w-4 h-4" />
                {wishlist.includes(product.id) ? "Wishlisted" : "Wishlist"}
              </button>
              <button
                className="px-3 py-1 rounded-full theme-button font-semibold text-xs theme-shadow hover:bg-pink-600 transition-all"
                onClick={() => handleBuyClick(product)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/wishlist" className="underline theme-text-primary hover:text-pink-600 dark:hover:text-pink-400 transition-all">View Wishlist</Link>
      </div>
    </div>
  );
}
