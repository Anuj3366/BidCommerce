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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  function signup() {
    console.log(name, email, password, address);
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log("Signed up");
          router.push('/');
        } else {
          console.log("Failed to signup");
        }
      });
  }

  return (
    <Center>
      <Box>
        <Title>Signup</Title>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
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
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button $primary onClick={signup}>
          Signup
        </Button>
      </Box>
    </Center>
  );
}
