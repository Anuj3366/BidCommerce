"use client";
import Header from "../components/Appbar";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
export default function HomePage() {
  var newProducts = "";
  var featuredProduct = "";
  fetch("http://localhost:3000/getAll/9899854206", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .then(data => {
    featuredProduct = data;
  });
  fetch("http://localhost:3000/getAll/getAllProduct", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .then(data => {
    newProducts = data;
  });
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}
