import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'sonner';

const ProductWrapper = styled.div`
  
`;

const Image = styled.img`
  width: 100%;  
  height: 100%; 
  object-fit: fill;
`;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, description, price, images, bid, bidEnd }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/isLogin', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn);
      });
  }, []);

  let url = '/product/' + _id;
  let buttonText = 'Add to cart';

  if (bid === true) {
    url = '/bid/' + _id;
    buttonText = 'Open Auction';
  }

  function addFeaturedToCart() {
    if (!isLoggedIn) {
      window.location.href = "/Login";
    }
    else {
      fetch("http://localhost:3000/addToCart", {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: _id }),
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
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <Image src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            {bid ? `₹${price}` : `Price: ₹${price}`}
          </Price>
          <Button block onClick={buttonText === 'Add to cart' ? addFeaturedToCart : null} $white $outline>
            {buttonText}
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}