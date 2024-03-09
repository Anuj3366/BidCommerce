import React, { useState, useEffect } from 'react';
import Center from '@/components/Center';
import Header from '@/components/Appbar';
import Title from '@/components/Title';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import CartIcon from '@/components/icons/CartIcon';
import Input from '@/components/Input';

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const res = await fetch(`http://localhost:3000/product/${product._id}/comment`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.comments) {
      setComments(data.comments);
    }
  }

  const addcomment = async (comment) => {
    const res = await fetch(`http://localhost:3000/product/${product._id}/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    const data = await res.json();
    if (data.comment) {
      setComments(prevComments => [...prevComments, data.comment]);
    }
  }

  function addToCart(product) {
    if (!token) window.location.href = "/Login";
    else {
      fetch("http://localhost:3000/addToCart", {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.redirectToLogin) {
            localStorage.removeItem('token');
            window.location.href = "/Login";
          }
          else console.log("Added to cart", data);
        });
    }
  }
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Title>
                  <Price>₹{product.price}</Price>
                </Title>
              </div>
              <div>
                <Button $primary onClick={() => addToCart(product)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
      <Center>
        <WhiteBox>
          <Title>Comments</Title>
          <Center>
            <p>Add a comment</p>
            <Input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={() => addcomment(newComment)}>
              Add
            </Button>
          </Center>
          <Center>{comments.join(', ')}</Center>
        </WhiteBox>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.params;
  const res = await fetch(`http://localhost:3000/get/${_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  const product = await res.json();
  return { props: { product } };
}