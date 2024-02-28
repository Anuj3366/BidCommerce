import React from "react";
import Header from "../components/Appbar";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { useFeaturedProduct, useNewProducts } from "./client";

export default function HomePage() {
  const featuredProduct = useFeaturedProduct();
  const newProducts = useNewProducts();

  return (
    <div>
      <Header />
      {featuredProduct && <Featured product={featuredProduct} />}
      {newProducts && <NewProducts products={newProducts} />}
    </div>
  );
}
