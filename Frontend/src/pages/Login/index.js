import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Center from '@/components/Center';
import Button from '@/components/Button';
import styled from 'styled-components';
import Input from '@/components/Input';
import Title from '@/components/Title';

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
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log("Logged in");
          router.push('/');
        } else {
          console.log("Failed to login");
        }
      });
  }

  return (
    <Center>
      <Box>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button $primary onClick={login}>
          Login
        </Button>
      </Box>
    </Center>
  );
}
