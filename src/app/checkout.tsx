import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function Checkout() {
  return (
    <Suspense>
      <CheckoutClient />
    </Suspense>
  );
}