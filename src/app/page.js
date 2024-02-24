"use client"
import Header from "../components/Appbar/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import connectDB from "@/Backend/mongoose";
export default function HomePage() {
  var featuredProduct = "";
  var newProducts = "";
  async function getData() {
    const featuredProductId = '640de2b12aa291ebdf213d48';
    await connectDB();
    featuredProduct = await Product.findById(featuredProductId);
    featuredProduct = JSON.parse(JSON.stringify(featuredProduct));
  }
  getData();
  fetch("http://localhost:1234/getAllProduct", {
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
