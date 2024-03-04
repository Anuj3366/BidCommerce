import { useState, useEffect } from 'react';
import Header from "../../components/Appbar";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage() {
  const [products, setProducts] = useState({});
  useEffect(() => {
    fetch("http://localhost:3000/getAllAuction", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      setProducts(data);
    });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <Title>All Auctions</Title>
        <ProductsGrid products={products} bid="true" />
      </Center>
    </>
  );
}
