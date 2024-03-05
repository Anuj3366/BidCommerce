import React, { useEffect, useState } from 'react';
import ProductsGrid from "@/components/ProductsGrid";
import Header from '@/components/Appbar';
import Center from '@/components/Center';
import { useNewProducts } from "@/components/client";

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    function fetchProducts() {
      const newProduct = useNewProducts()
      setProducts(newProduct)
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Center>
        <div>
          <h2>Categories</h2>
          {['Electronics', 'Clothes', 'Furniture', 'Books', 'Home Appliances',
            'Sports', 'Toys', 'Beauty & Health', 'Automotive', 'Garden',
            'Music', 'Movies & TV Shows', 'Video Games', 'Computers', 'Office Supplies',
            'Pet Supplies', 'Baby', 'Grocery', 'Tools & Home Improvement', 'Arts & Crafts'].map(category => (
              <button key={category} onClick={() => handleCategoryClick(category)}>
                {category}
              </button>
            ))}

          <h2>Products</h2>
          <ProductsGrid products={selectedCategory ? products.filter(product => product.category === selectedCategory) : products} />
        </div>
      </Center>
    </>
  );
}

export default CategoryPage;
