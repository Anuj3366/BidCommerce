"use client"
import { useState, useEffect } from "react";
import Header from "../components/Appbar";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";

export default function HomePage() {
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/9899854206", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      setFeaturedProduct(data);
    });

    fetch("http://localhost:3000/getAllProduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      setNewProducts(data);
    });
  }, []);

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}
