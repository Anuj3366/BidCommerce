"use client";
import Header from "../../components/Appbar";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { toast } from 'sonner';


const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
  }
`;

function CartPage() {
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/getCart', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
          let totalCost = 0;
          for (const item of data) {
            totalCost += item.productId.price * item.quantity;
          }
          setTotal(totalCost);
        }
      });
  }, []);

  async function goToPayment() {
    const response = await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address, products,
      }),
    });
    const data = await response.json();
    if (data.url) {
      window.location = data.url;
    } else if (data.message === 'Product out of stock') {
      toast.error('Product out of stock');
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
                  {products.map(item => (
                    <tr key={item._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={item.productId.images?.[0]} alt="" />
                        </ProductImageBox>
                        {item.productId.title}
                      </ProductInfoCell>
                      <td>{item.quantity}</td>
                      <td>₹{item.productId.price * item.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>₹{total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!products?.length && (
            <Box>
              <h2>Order information</h2>
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

