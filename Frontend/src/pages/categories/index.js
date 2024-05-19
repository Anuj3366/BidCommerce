"use clients"
import React, { useEffect, useState } from 'react';
import ProductsGrid from "@/components/ProductsGrid";
import Layout from '@/components/Layout';
import Center from '@/components/Center';

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetch("https://bidcommerce.onrender.com/getAll", {
      method: 'GET',
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
        <div>
          <h2>Categories</h2>
          {['Electronics', 'Clothes', 'Furniture', 'Books', 'Home Appliances',
            'Sports', 'Toys', 'Beauty & Health', 'Automotive', 'Garden',
            'Music', 'Movies & TV Shows', 'Video Games', 'Computers or PC or Laptops', 'Office Supplies',
            'Pet Supplies', 'Baby', 'Grocery', 'Tools & Home Improvement', 'Arts & Crafts'].map(category => (
              <button key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </button>
            ))}

          <h2>Products</h2>
          <ProductsGrid products={selectedCategory ? products.filter(product => product.category === selectedCategory) : products} />
        </div>
      </Center>
      </Layout>
    </>
  );
}

export default CategoryPage;
