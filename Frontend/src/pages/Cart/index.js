"use client";
import Header from "../../components/Appbar";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import Input from "@/components/Input";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

function CartPage() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/getCart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.redirectToLogin) {
          localStorage.removeItem('token');
          window.location.href = "/Login";
        }
        else {
          setProducts(data);
        }
      });
  }, []);

  async function goToPayment() {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        email, address, products,
      }),
    });
    const data = await response.json();
    if (data.url) {
      window.location = data.url;
    }
  }

  let total = 0;
  if (Array.isArray(products)) {
    for (const product of products) {
      const price = product.price;
      total += price;
    }
  }
  if (isSuccess) {
    window.location.href = "/success";
    setTimeout(() => {
      window.location.href = "/";
    }, 10000);
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!products?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {products.filter(item => item._id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${products.filter(item => item._id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!products?.length && (
            <Box>
              <h2>Order information</h2>
              <Input type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={ev => setEmail(ev.target.value)} />
              <Input type="text"
                placeholder="Address"
                value={address}
                name="address"
                onChange={ev => setAddress(ev.target.value)} />
              <Button black block
                onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}

export default CartPage;
