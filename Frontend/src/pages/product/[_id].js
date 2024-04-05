import React, { useState, useEffect } from 'react';
import Center from '@/components/Center';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import CartIcon from '@/components/icons/CartIcon';
import Input from '@/components/Input';
import { toast } from 'sonner';

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
const CommentBox = styled.div`
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
`;

const CommentText = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Comment = styled.div`
  margin-top: 20px;
`

export default function ProductPage({ product }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setComments(product.comments);
  }, []);

  const addcomment = async (comment) => {
    const res = await fetch(`http://65.0.145.134:3000/product/${product._id}/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });
    const data = await res.json();
    console.log(data);
    if (data.message === "Comment added") {
      setComments(prevComments => [...prevComments, data.comment]);
      setNewComment("")
      toast.success("Comment Added")
    }
  }


  async function addToCart(product) {
    const res = await fetch('http://65.0.145.134:3000/isLogin', {
      method: 'GET',
      credentials: 'include',
    });
    const data = await res.json();
    if (!data.loggedIn) window.location.href = "/Login";
    else {
      fetch("http://65.0.145.134:3000/addToCart", {
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
          else toast.success("Added to cart");
        });
    }
  }
  return (
    <>
      <Layout>
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
                  <Button $primary $center onClick={() => addToCart(product)}>
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
            <Center>
              <Comment>
                {comments.map((commentObj, index) => (
                  <CommentBox key={index}>
                    <CommentText>{commentObj.comment}</CommentText>
                  </CommentBox>
                ))}
              </Comment>
            </Center>
          </WhiteBox>
        </Center>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.params;
  try {
    const res = await fetch(`http://65.0.145.134:3000/get/${_id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {

      throw new Error(`Error fetching product: ${res.status}`);
    }

    const product = await res.json();
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }
}
