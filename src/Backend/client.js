"use client";
import { useState, useEffect } from "react";

const useFeaturedProducts = function() {
  console.log("useFeaturedProducts started")
  const [featuredProduct, setFeaturedProduct] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/getAll/65dc40601ec17587c3d020a4", {
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

const useNewProducts = function() {
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

export { useFeaturedProducts, useNewProducts };
