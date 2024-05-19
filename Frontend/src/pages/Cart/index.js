"use client";
import Layout from "../../components/Layout";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { toast } from 'sonner';
import Router from 'next/router';


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
    fetch("https://bidcommerce.onrender.com/getCart", {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.redirectToLogin) {
          Router.push('/Login');
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
    console.log(products);
  }, []);


  async function goToPayment() {
    const response = await fetch("https://bidcommerce.onrender.com/checkout", {
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
    if (data.message === 'Order placed') {
      setProducts([]);
      toast.success('Order placed');

      await fetch("https://bidcommerce.onrender.com/empty-cart", {
        method: 'POST',
        credentials: 'include',
      });
    } else {
      switch (data.message) {
        case 'Product out of stock':
          toast.error('Product out of stock');
          break;
        case 'User not found':
          toast.error('User not found');
          break;
        default:
          toast.error('An error occurred');
      }
    }
  }

  async function removeFromCart(productId) {
    const response = await fetch("https://bidcommerce.onrender.com/removeFromCart", {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (data.message === 'Removed from cart') {
      setProducts(products.filter(item => item.productId._id !== productId));
      toast.success("Removed from cart");
    } else {
      console.log(data.message);
      toast.error('Failed to remove from cart');
    }
  }

  async function decreaseQuantity(productId) {
    const response = await fetch("https://bidcommerce.onrender.com/decreaseQuantity", {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    if (data.message === 'Decreased quantity') {
      setProducts(products.map(item =>
        item.productId._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
      toast.success('Decreased quantity');
    } else {
      console.log(data.message);
      toast.error('Failed to decrease quantity');
    }
  }

  async function increaseQuantity(productId) {
    const response = await fetch("https://bidcommerce.onrender.com/increaseQuantity", {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    const data = await response.json();
    console.log(data);
    if (data.message === 'Increased quantity') {
      setProducts(products.map(item =>
        item.productId._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success('Increased quantity');
    } else {
      console.log(data.message)
      toast.error('Failed to increase quantity');
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
      <Layout>
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
                      <th></th>
                      <th>Quantity</th>
                      <th></th>
                      <th>Price</th>
                      <th>Actions</th>
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
                        <td><button onClick={() => decreaseQuantity(item.productId._id)}>-</button></td>
                        <td>{item.quantity}</td>
                        <td><button onClick={() => increaseQuantity(item.productId._id)}>+</button></td>
                        <td>₹{item.productId.price * item.quantity}</td>
                        <td>
                          <button onClick={() => removeFromCart(item.productId._id)}>x</button>
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      <td></td>
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
      </Layout>
    </>
  );
}

export default CartPage;

