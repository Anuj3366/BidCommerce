import React, { useEffect, useState } from 'react';

function SellerProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/seller/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
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
    fetch(`http://localhost:3000/product/${productId}/quantity`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ increaseBy })
    })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.error(err));
  };
  return (
    <div>
      <h1>Sell a Product</h1>
      <form onSubmit={handleProductSubmit}>
        <Input type="text" name="title" value={productDetails.title} onChange={handleProductDetailsChange} placeholder="Title" required />
        <Input type="text" name="description" value={productDetails.description} onChange={handleProductDetailsChange} placeholder="Description" required />
        <Input type="number" name="price" value={productDetails.price} onChange={handleProductDetailsChange} placeholder="Price" required />
        <Input type="text" name="images" value={productDetails.images} onChange={handleProductDetailsChange} placeholder="Images (comma-separated URLs)" required />
        <Input type="text" name="category" value={productDetails.category} onChange={handleProductDetailsChange} placeholder="Category" required />
        <Input type="number" name="quantity" value={productDetails.quantity} onChange={handleProductDetailsChange} placeholder="Quantity" required />
        <Input type="checkbox" name="bid" checked={productDetails.bid} onChange={handleProductDetailsChange} /> Bid Item
        {productDetails.bid && (
          <>
            <Input type="number" name="bidPrice" value={productDetails.bidPrice} onChange={handleProductDetailsChange} placeholder="Bid Price" required />
            <Input type="date" name="bidEnd" value={productDetails.bidEnd} onChange={handleProductDetailsChange} placeholder="Bid End Date" required />
          </>
        )}
        <button type="submit">Upload Product</button>
      </form>
      {products.map(product => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => increaseQuantity(product._id, 1)}>Increase Quantity</button>
        </div>
      ))}
    </div>
  )
};

export default SellerProducts;