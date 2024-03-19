import React, { useState, useEffect } from 'react';
import Center from '@/components/Center';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { toast } from 'sonner';
import Countdown from 'react-countdown';

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
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd; 
  &:hover {
    background-color: #f8f8f8;
  }
`;
const CommentText = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;
const Comment = styled.div`
  margin-top: 20px;
`;
const BidRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const BidInput = styled(Input)`
  width: 100px;
`;

export default function ProductPage({ product }) {
  const [isMounted, setIsMounted] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [bid, setBid] = useState(product.price);
  const [bidEnded, setBidEnded] = useState(false);
  const [price, setPrice] = useState(product.price);
  const [highestBidder, setHighestBidder] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setComments(product.comments);
    if (new Date(product.bidEnd).getTime() < Date.now()) {
      setBidEnded(true);
    }
  }, []);
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
    console.log(data);
    if (data.message === "Comment added") {
      setComments(prevComments => [...prevComments, data.comment]);
      setNewComment("")
      toast.success("Comment Added")
    }
  }

  const placeBid = async () => {
    if (bid <= product.price) {
      toast.error("Your bid must be higher than the current price.");
      return;
    }
    const res = await fetch(`http://localhost:3000/product/${product._id}/bid`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bid }),
    });
    const data = await res.json();
    if (data.message === "Bid placed") {
      toast.success("Highest Bid placed");
      product.price = bid;
      setPrice(bid);
      setHighestBidder(true);
    }
  }

  return (
    <>
      <Layout>
        <div id="root"></div>
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
                    <Price>₹{price}</Price>
                  </Title>
                </div>
                <div>
                  {!bidEnded && (
                    <BidRow>
                      <BidInput
                        type="number"
                        min={product.price + 1}
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        />
                      <Button onClick={placeBid}>Place Bid</Button>
                        {highestBidder && <p>You are the highest bidder!</p>}
                    </BidRow>
                  )}
                  {bidEnded && <p>Bidding has ended.</p>}
                </div>
              </PriceRow>
              {isMounted && <Countdown date={new Date(product.bidEnd)} />}
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
    const res = await fetch(`http://localhost:3000/get/${_id}`, {
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
