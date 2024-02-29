import Center from '@/components/Center';
import Header from '@/components/Appbar';
import Title from '@/components/Title';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import CartIcon from '@/components/icons/CartIcon';

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
                <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.params;
  const res = await fetch(`http://localhost:3000/getAll/${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
