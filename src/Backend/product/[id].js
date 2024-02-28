"use client";
const Center = require('@/components/Center');
const Header = require('@/components/Appbar');
const Title = require('@/components/Title');
const { connectDB } = require('@/Backend/mongoDB.js');
const { Product } = require('@/Backend/Schemas/Product');
const styled = require('styled-components');
const WhiteBox = require('@/components/WhiteBox');
const ProductImages = require('@/components/ProductImages');
const Button = require('@/components/Button');
const CartIcon = require('@/components/icons/CartIcon');
const { useContext } = require('react');
const { CartContext } = require('@/components/CartContext');

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

module.exports = async function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);
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
                <Price>${product.price}</Price>
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

module.exports.getServerSideProps = async function(context) {
  await connectDB();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}
