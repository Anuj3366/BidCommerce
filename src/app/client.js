"use client";
import { useState, useEffect } from "react";

export function useFeaturedProduct() {
  const [featuredProduct, setFeaturedProduct] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/65dc40601ec17587c3d020a4", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        setFeaturedProduct(data);
      });
  }, []);

  return featuredProduct;
}

export function useNewProducts() {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
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

  return newProducts;
}
