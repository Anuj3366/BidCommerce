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
  margin: 10% auto;
  @media screen and (max-width: 768px) {
    width: 80%;
    height: 80%;
    margin: 5% auto;
  }
`;


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  function signup() {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.info("Password must be at least 6 characters long and contain at least one number and one special character.");
      return;
    }
    console.log(name, email, password, address);
    fetch("http://localhost:8080/signup", {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          toast.success("Signup successful");
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          toast.success("Failed to signup");
        }
      });
  }

  return (
    <>
      <Layout>
        <Center>
          <Box>
            <Title>Signup</Title>
            <Input
              type="text"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
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
            <Input
              type="text"
              name="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button $black onClick={signup}>
              Signup
            </Button>
          </Box>
        </Center>
      </Layout>
    </>
  );
}
