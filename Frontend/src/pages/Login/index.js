import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Center from '@/components/Center';
import Button from '@/components/Button';
import styled from 'styled-components';
import Input from '@/components/Input';
import Title from '@/components/Title';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 3%;
  width: 40%;
  height: 60%;
  margin: 20% auto;
  @media screen and (max-width: 768px) {
    width: 80%;
    height: 80%;
    margin: 10% auto;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function login() {
    fetch("https://bidcommerce.onrender.com/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          toast.success('Welcome! You are now logged in!')
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          toast.error('Invalid email or password')
        }
      });
  }


  return (
    <>
      <Layout>
      <Center>
        <Box>
          <Title>Login</Title>
          <Input
            type="text"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button $black onClick={login}>
            Login
          </Button>
        </Box>
      </Center>
      </Layout>
    </>
  );
}
