"use client";
import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import Input from "@/components/Input";
import ModeratorPanel from "./moderator";
import SellerProducts from "./seller"
import AdminPanel from "./admin";
import Center from "@/components/Center";
import Button from "@/components/Button";
import styled from 'styled-components';
import Title from "@/components/Title";
import { toast } from 'sonner';


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

const AccountInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const RoleDiv = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 20px;
`;

export default function ProductsPage() {
  const [userData, setUserData] = useState('');

  useEffect(() => {

    fetch('http://localhost:8080/checkuserType', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.redirectToLogin) {
          toast.warning('Please login first');
          window.location.href = "/Login";
        }
        setUserData(data._doc);
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
    if (!sellerDetails.shopname.trim()) {
      toast.error('Shop name is required');
      return;
    }
    sellerDetails.shopemail = userData.email;
    const gstinRegex = /^[\d]{2}[a-zA-Z]{5}[\d]{4}[a-zA-Z]{1}[\d]{1}[zZ]{1}[\d]{1}$/;
    if (!sellerDetails.GSTINnumber.trim() || !gstinRegex.test(sellerDetails.GSTINnumber)) {
      toast.error('Valid GSTIN number is required');
      return;
    }
    const panRegex = /^[a-zA-Z]{5}[\d]{4}[a-zA-Z]{1}$/;
    if (!sellerDetails.PANnumber.trim() || !panRegex.test(sellerDetails.PANnumber)) {
      toast.error('Valid PAN number is required');
      return;
    }
    if (!sellerDetails.address.trim()) {
      toast.error('Address is required');
      return;
    }
    await fetch('http://localhost:8080/becomeSeller', {
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
        setUserData(userData.userType = 'notverified');
        toast.info('Your account is being verified');
      })
      .catch(err => console.error('Error:', err));
  };
  const handleWorkerSubmit = async (event) => {
    event.preventDefault();
    const adhaarRegex = /^[\d]{12}$/;
    if (!workerDetails.adhaar.trim() || !adhaarRegex.test(workerDetails.adhaar)) {
      toast.error('Valid Adhaar number is required');
      return;
    }
    fetch('http://localhost:8080/becomeWorker', {
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
        setUserData(userData.userType = 'notverified');
        toast.info('Your account is being verified');
      })
      .catch(err => console.error('Error:', err));

  };

  return (
    <>
      <Layout>
        <Center>
          <Title>Account</Title>
        </Center>
        <Center>
          <AccountInfo>
            <h2>Name : {userData.name}</h2>
            <h2>Email : {userData.email}</h2>
            {userData.userType !== "user" && (
              <h2>Your Account Type: {userData.userType}</h2>
            )}
          </AccountInfo>
        </Center>
        <Center>
          {userData.userType === "notverified" && (
            <RoleDiv>
              <h1>Verification Pending</h1>
              <p>Your account is currently being verified. This process may take some time.</p>
              <p>Please check back later.</p>
            </RoleDiv>
          )}
          {userData.userType === "user" && (
            <RoleDiv>
              <p>Would you like to become a seller or a worker?</p>
              <StyledDiv>
                <Button onClick={handleBecomeSeller}>Become a Seller</Button>
                <Button onClick={handleBecomeWorker}>Become a Worker</Button>
              </StyledDiv>
              {role === 'seller' && (
                <InputDiv>
                  <h2>Please provide these details</h2>
                  <Input type="text" name="shopname" value={sellerDetails.shopname} onChange={handleSellerDetailsChange} placeholder="Shop Name" required />
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
            </RoleDiv>
          )}
          {userData.userType === "seller" && (
            <SellerProducts />
          )}
          {userData.userType === "moderator" && (
            <ModeratorPanel />
          )}
          {userData.userType === "admin" && (
            <AdminPanel />
          )}
        </Center>
      </Layout>
    </>
  );
}