import React, { useEffect, useState } from 'react';
import Input from "@/components/Input";
import Button from "@/components/Button";
import Center from "@/components/Center";
import styled from 'styled-components';
import Cookies from 'js-cookie';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    title: '',
    description: '',
    price: '',
    images: [],
    category: '',
    quantity: '',
    bid: false,
    bidPrice: '',
    bidEnd: '',
  });

  const handleProductDetailsChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    setImage(Array.from(event.target.files));
  };

  const saveImage = async () => {
    const urls = await Promise.all(productDetails.images.map(async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "myCloud");
      data.append("cloud_name", "dyoedgbpj");

      const res = await fetch('https://api.cloudinary.com/v1_1/dyoedgbpj/image/upload', {
        method: 'POST',
        credentials: 'include',
        body: data
      })

      const cloudData = await res.json();
      return cloudData.url;
    }));

    setProductDetails({
      ...productDetails,
      images: urls,
    });
  };

  useEffect(() => {
    const token = Cookies.get('jwt');
    fetch('http://localhost:3000/seller/products', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error('Fetching products failed: ', err));
  }, []);

  const increaseQuantity = (productId, increaseBy) => {
    const token = Cookies.get('jwt');
    fetch(`http://localhost:3000/product/${productId}/quantity`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ increaseBy })
    })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    await saveImage();
    const token = Cookies.get('jwt');
    try {
      const response = await fetch('http://localhost:3000/uploadProduct', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(productDetails)
      });
      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Center>
      <h1>Sell a Product</h1>
      <form onSubmit={handleProductSubmit}>
        <Input type="text" name="title" value={productDetails.title} onChange={handleProductDetailsChange} placeholder="Title" required />
        <Input type="text" name="description" value={productDetails.description} onChange={handleProductDetailsChange} placeholder="Description" required />
        <Input type="number" name="price" value={productDetails.price} onChange={handleProductDetailsChange} placeholder="Price" required />
        <Input type="file" name="images" onChange={handleImageChange} multiple required />
        <Input type="text" name="category" value={productDetails.category} onChange={handleProductDetailsChange} placeholder="Category" required />
        <Input type="number" name="quantity" value={productDetails.quantity} onChange={handleProductDetailsChange} placeholder="Quantity" required />
        <input type="checkbox" name="bid" checked={productDetails.bid} onChange={handleProductDetailsChange} /> Bid Item
        {productDetails.bid && (
          <>
            <Input type="number" name="bidPrice" value={productDetails.bidPrice} onChange={handleProductDetailsChange} placeholder="Bid Price" required />
            <Input type="date" name="bidEnd" value={productDetails.bidEnd} onChange={handleProductDetailsChange} placeholder="Bid End Date" required />
          </>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button $black type="submit">Upload Product</Button>
        </div>
      </form>
      {products.map(product => (
        <ProductCard key={product._id}>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
          <IncreaseButton onClick={() => increaseQuantity(product._id, 1)}>Increase Quantity</IncreaseButton>
        </ProductCard>
      ))}
    </Center>
  )
};

export default SellerProducts;