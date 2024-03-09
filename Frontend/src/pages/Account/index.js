"use client";
import React, { useEffect, useState } from 'react';
import Header from "../../components/Appbar";
import Input from "@/components/Input";
import ModeratorPanel from "./moderator";
import SellerProducts from "./seller"
import AdminPanel from "./admin";
import Center from "@/components/Center";
import Button from "@/components/Button";
import styled from 'styled-components';
import Title from "@/components/Title";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom:5vh;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom:5vh;
  border: 1px solid #000;
  padding: 20px;
  border-radius: 10px;
`;

export default function ProductsPage() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    
    fetch('http://localhost:3000/checkuserType', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.redirectToLogin) {
          window.location.href = "/Login";
        }
        setUserType(data);
      });
  }, []);

  const [sellerDetails, setSellerDetails] = useState({
    shopname: '',
    shopemail: '',
    GSTINnumber: '',
    PANnumber: '',
    productId: '',
    address: '',
  });
  const [workerDetails, setWorkerDetails] = useState({
    adhaar: '',
  });
  const [role, setRole] = useState('');

  const handleBecomeSeller = () => {
    setRole('seller');
  };

  const handleBecomeWorker = () => {
    setRole('worker');
  };
  const handleSellerDetailsChange = (event) => {
    setSellerDetails({
      ...sellerDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleWorkerDetailsChange = (event) => {
    setWorkerDetails({
      ...workerDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleSellerSubmit = async (event) => {
    event.preventDefault();
    
    await fetch('http://localhost:3000/becomeSeller', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(sellerDetails),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUserType('notverified');
      })
      .catch(err => console.error('Error:', err));
  };
  const handleWorkerSubmit = async (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/becomeWorker', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workerDetails),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUserType('notverified');
      })
      .catch(err => console.error('Error:', err));

  };

  return (
    <>
      <Header />
      <Center>
        <Title>Account</Title>
      </Center>
      <Center>
        <h2>Name :${name}</h2>
        <h2>Your Account Type: {userType}</h2>

      </Center>
      <Center>
        {userType === "notverified" && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
            <h1>Verification Pending</h1>
            <p>Your account is currently being verified. This process may take some time.</p>
            <p>Please check back later.</p>
          </div>
        )}
        {userType === "user" && (
          <div>
            <p>Would you like to become a seller or a worker?</p>
            <StyledDiv>
              <Button onClick={handleBecomeSeller}>Become a Seller</Button>
              <Button onClick={handleBecomeWorker}>Become a Worker</Button>
            </StyledDiv>
            {role === 'seller' && (
              <InputDiv>
                <h2>Please provide these details</h2>
                <Input type="text" name="shopname" value={sellerDetails.shopname} onChange={handleSellerDetailsChange} placeholder="Shop Name" required />
                <Input type="text" name="shopemail" value={sellerDetails.shopemail} onChange={handleSellerDetailsChange} placeholder="Shop Email" required />
                <Input type="text" name="GSTINnumber" value={sellerDetails.GSTINnumber} onChange={handleSellerDetailsChange} placeholder="GSTIN Number" required />
                <Input type="text" name="PANnumber" value={sellerDetails.PANnumber} onChange={handleSellerDetailsChange} placeholder="PAN Number" required />
                <Input type="text" name="address" value={sellerDetails.address} onChange={handleSellerDetailsChange} placeholder="Address" required />
                <Button onClick={handleSellerSubmit} $black>Submit</Button>
              </InputDiv>
            )}
            {role === 'worker' && (
              <InputDiv>
                <h2>Please provide this detail</h2>
                <Input type="text" name="adhaar" value={workerDetails.adhaar} onChange={handleWorkerDetailsChange} placeholder="Adhaar" required />
                <Button onClick={handleWorkerSubmit} $black>Submit</Button>
              </InputDiv>
            )}
          </div>
        )}
        {userType === "seller" && (
          <SellerProducts />
        )}
        {userType === "moderator" && (
          <ModeratorPanel />
        )}
        {userType === "admin" && (
          <AdminPanel />
        )}
      </Center>
    </>
  );
}