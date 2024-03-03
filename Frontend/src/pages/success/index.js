import React from 'react';
import Header from '@/components/Appbar';
import Center from '@/components/Center';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;


export default function CartPage() {
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Thanks for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </Box>
        </ColumnsWrapper>
      </Center>
    </>
  );
}