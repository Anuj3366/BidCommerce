import { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage() {
  const [products, setProducts] = useState({});
  useEffect(() => {
    fetch("https://bidcommerce.onrender.com/getAllAuction", {
      method: 'GET',
      credentials: 'include',
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
      <Layout>
        <Center>
          <Title>All Auctions</Title>
          <ProductsGrid products={products} bid="true" />
        </Center>
      </Layout>
    </>
  );
}
