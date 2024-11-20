"use client";
import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import { useState, useEffect } from "react";


const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts() {
  const [products, setNewProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/getAllProduct", {
      method: 'GET',
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
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}