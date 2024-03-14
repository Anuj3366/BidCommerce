import React, { useEffect, useState } from 'react';
import Input from "@/components/Input";
import Button from "@/components/Button";
import Center from "@/components/Center";
import { toast } from 'sonner';
import styled from 'styled-components';


const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProductTitle = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: #333;
`;
const ProductQuantity = styled.p`
  font-size: 1em;
  text-align: center;
  color: #666;
`;
const IncreaseButton = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;
const ProductCategory = styled.p`
  font-size: 1em;
  text-align: center;
  color: #888;
`;


const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
`;

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


  useEffect(() => {
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


  const handleImageChange = (event) => {
    setProductDetails({
      ...productDetails,
      images: Array.from(event.target.files),
    });
  };

  const saveImage = async () => {
    try {
      const urls = await Promise.all(productDetails.images.map(async (image) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "myCloud");
        data.append("cloud_name", "dyoedgbpj");

        const res = await fetch('https://api.cloudinary.com/v1_1/dyoedgbpj/image/upload', {
          method: 'POST',
          body: data
        });

        if (!res.ok) {
          throw new Error('Failed to upload image');
        }

        const cloudData = await res.json();

        if (typeof cloudData.url !== 'string') {
          console.error('Cloudinary API returned unexpected data:', cloudData);
          throw new Error('Invalid URL returned from Cloudinary');
        }
        return cloudData.url;
      }));
      setProductDetails(prevDetails => ({
        ...prevDetails,
        images: urls,
      }));
    } catch (error) {
      console.error('Error in saveImage:', error);
    }
  };




  const increaseQuantity = (productId, increaseBy) => {

    fetch(`http://localhost:3000/product/${productId}/quantity`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ increaseBy })
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Quantity Increased")
        console.log(data.message)
      })
      .catch(err => {
        toast.error("Error Please Reload")
        console.error(err)
      });
  };

  const handleProductDetailsChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleProductSubmit = async (event) => {
    event.preventDefault();
    await saveImage();

    try {
      const response = await fetch('http://localhost:3000/uploadProduct', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productDetails,
          reviews: [],
          buyed: 0,
        })
      });
      const data = await response.json();
      toast.success("Product Added")
      console.log(data.message);
    } catch (err) {
      toast.success("Error in Adding Product")
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
        <StyledLabel>Category</StyledLabel>
        <StyledSelect name="category" value={productDetails.category} onChange={handleProductDetailsChange} required>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
          <option value="Furniture">Furniture</option>
          <option value="Books">Books</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Sports">Sports</option>
          <option value="Toys">Toys</option>
          <option value="Beauty & Health">Beauty & Health</option>
          <option value="Automotive">Automotive</option>
          <option value="Garden">Garden</option>
          <option value="Music">Music</option>
          <option value="Movies & TV Shows">Movies & TV Shows</option>
          <option value="Video Games">Video Games</option>
          <option value="Computers">Computers</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Pet Supplies">Pet Supplies</option>
          <option value="Baby">Baby</option>
          <option value="Grocery">Grocery</option>
          <option value="Tools & Home Improvement">Tools & Home Improvement</option>
          <option value="Arts & Crafts">Arts & Crafts</option>
        </StyledSelect>
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
    <ProductTitle>{product.title}</ProductTitle>
    <ProductCategory>{product.category}</ProductCategory>
    <ProductQuantity>{product.quantity}</ProductQuantity>
    <IncreaseButton onClick={() => increaseQuantity(product._id, 1)}>Increase Quantity</IncreaseButton>
  </ProductCard>
))}
    </Center>
  )
};

export default SellerProducts;