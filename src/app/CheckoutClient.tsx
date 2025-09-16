"use client";
import { useSearchParams } from "next/navigation";
import products from "./products";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe("pk_test_51Nw...your_key_here");

function CheckoutForm({ product }: { product: any }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  if (success) {
    return <div className="theme-text-primary font-bold text-lg">Payment successful! Thank you for your purchase.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4 mt-4">
      <CardElement className="p-2 theme-input rounded transition-all" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="px-6 py-3 rounded theme-button font-bold text-lg mt-2 disabled:opacity-50 hover:bg-pink-700 transition-all"
      >
        {loading ? "Processing..." : `Pay $${product.price.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center theme-bg">
        <p className="theme-text-secondary">Product not found.</p>
        <Link href="/" className="underline theme-text-primary hover:text-pink-600 dark:hover:text-pink-400 transition-all mt-4">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center theme-bg py-10 px-4">
      <div className="theme-card rounded-lg theme-shadow-lg p-8 flex flex-col items-center w-full max-w-md theme-border border transition-all">
        <Image src={product.image} alt={product.name} width={180} height={180} className="rounded mb-4 theme-border border transition-all" />
        <h2 className="text-2xl font-semibold mb-2 theme-text-primary">{product.name}</h2>
        <p className="theme-text-secondary font-bold mb-4">${product.price.toFixed(2)}</p>
        <Elements stripe={stripePromise}>
          <CheckoutForm product={product} />
        </Elements>
        <Link href="/" className="underline theme-text-primary hover:text-pink-600 dark:hover:text-pink-400 transition-all mt-4">Back to Shop</Link>
      </div>
    </div>
  );
}


