"use client";

import Link from "next/link";
import {
  HomeIcon,
  HeartIcon,
  SparklesIcon,
  BeakerIcon,
  UserIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

const navCategories = [
  { name: "Home", icon: <HomeIcon className="w-5 h-5 theme-text-primary" />, category: "All" },
  { name: "Skincare", icon: <BeakerIcon className="w-5 h-5 theme-text-secondary" />, category: "Skincare" },
  { name: "Makeup", icon: <SparklesIcon className="w-5 h-5 theme-text-secondary" />, category: "Makeup" },
  { name: "Fragrance", icon: <UserIcon className="w-5 h-5 theme-text-muted" />, category: "Fragrance" },
];

const Navbar = () => {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleCategoryClick = (category: string) => {
    const url = category === "All" ? "/" : `/?category=${encodeURIComponent(category)}`;
    router.push(url);
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="w-full theme-card sticky top-0 z-50 py-4 px-6 flex items-center justify-between theme-border border-b transition-all">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold theme-text-primary tracking-tight transition-all">Trendhive</Link>
        <ul className="hidden md:flex gap-6 ml-8 theme-text-muted font-medium">
          {navCategories.map((cat) => (
            <li key={cat.name}>
              <button
                className="flex items-center gap-1 hover:text-pink-600 dark:hover:text-pink-400 focus:outline-none bg-transparent transition-all"
                onClick={() => handleCategoryClick(cat.category)}
              >
                {cat.icon}
                {cat.name}
              </button>
            </li>
          ))}
          <li>
            <Link href="/wishlist" className="flex items-center gap-1 hover:text-pink-600 dark:hover:text-pink-400 transition-all">
              <HeartIcon className="w-5 h-5 theme-text-secondary"/>
              Wishlist
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4 relative">
        <input
          type="text"
          placeholder="Search beauty..."
          className="rounded-full theme-input px-4 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
        />
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full theme-card theme-text-muted hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 