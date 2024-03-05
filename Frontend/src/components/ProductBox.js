import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";
import { useEffect } from "react";

const ProductWrapper = styled.div`
  
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

export default function ProductBox({ _id, title, description, price, images, bid }) {
  let url = '/product/' + _id;

  if (bid === true) {
    url = '/bid/' + _id;
  }
  function addFeaturedToCart() {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = "/Login";
    else {
      fetch("http://localhost:3000/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ productId: _id }),
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
  const [product, setProduct] = useState(null);
  const [userBid, setUserBid] = useState(0);

  useEffect(() => {
    fetch(`/product/${_id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [_id]);

  const handleBidChange = (event) => {
    setUserBid(event.target.value);
  };

  const handleBidSubmit = () => {
    if (new Date() > new Date(product.bidEnd)) {
      alert('The bidding period has ended.');
    } else if (userBid > product.bidPrice) {
      fetch(`/bid/${_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bidPrice: userBid })
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message);
          setProduct(prevState => ({ ...prevState, bidPrice: userBid }));
        })
        .catch(err => console.error(err));
    } else {
      alert('Your bid must be higher than the current bid.');
    }
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            {bid ? `Current bid: ₹${price}` : `Price: ₹${bidprice}`}
          </Price>
          {bid ? (
            <>
              <input type="number" value={userBid} onChange={handleBidChange} />
              <Button block onClick={handleBidSubmit} $white $outline>
                Place a higher bid
              </Button>
            </>
          ) : (
            <Button block onClick={addFeaturedToCart} $white $outline>
              Add to cart
            </Button>
          )}
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}