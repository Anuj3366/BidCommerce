import Center from '@/components/Center';
import Header from '@/components/Appbar';
import Title from '@/components/Title';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import CartIcon from '@/components/icons/CartIcon';
import Input from '@/components/Input';
import Cookies from 'js-cookie';

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

export default function ProductPage({ product, comments }) {
  const addcomment = async (comment) => {
    const token = localStorage?.getItem('token');
    if (!token) {
      window.location.href = "/login";
    }
    else {
      const res = await fetch(`http://localhost:3000/product/${product._id}/comment`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ comment }),
      });
      const data = await res?.json();
      if (data.redirectToLogin) {
        window.location.href = "/login";
      }
    }
  }
  if (comments.length == 0) {
    comments = <p>No comments</p>
  }
  else {
    comments = comments.map((comment) => {
      return <p>{comment}</p>
    })
  }
  function addToCart(product) {
    const token = Cookies.get('jwt');
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
                <Price>₹{product.price}</Price>
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
          <Center><p>Add a comment</p>

            <Input type="text" placeholder="Add a comment" />
            <Button $primary onClick={() => addcomment("Hello")}>
              Add
            </Button>
          </Center>
          <Center>{comments}</Center>
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

  if (!res.ok) {
    console.error(`Error fetching product: ${res.status}`);
    return { props: {} };
  }

  const product = await res.json();

  const commentsRes = await fetch(`http://localhost:3000/product/${_id}/comment`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!commentsRes.ok) {
    console.error(`Error fetching comments: ${commentsRes.status}`);
    return { props: { product } };
  }

  const comments = await commentsRes.json();

  return {
    props: {
      product,
      comments,
    },
  };
}
