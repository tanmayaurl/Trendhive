import Stripe from "stripe";
import { NextResponse } from "next/server";
import products from "@/app/products";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is not set. PaymentIntent creation will fail.");
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" }) : (null as unknown as Stripe);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body as { productId: number };

    const product = products.find((p) => p.id === Number(productId));
    if (!product) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    if (!stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const amountInCents = Math.round(product.price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        productId: String(product.id),
        productName: product.name,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("PaymentIntent creation failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


