"use client";
import React, { useEffect, useState } from 'react';
import Header from "../../components/Appbar";
import Input from "@/components/Input";
import ModeratorPanel from "./moderator";
import SellerProducts from "./seller"
import AdminPanel from "./admin";
import Center from "@/components/Center";


export default function ProductsPage() {
  const [userType, setUserType] = useState('');

  useEffect(() => {//to get userType
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/checkuserType', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserType(data);
      });
  }, []);
  const [becomeSeller, setBecomeSeller] = useState(false);
  const [becomeWorker, setBecomeWorker] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({
    email: '',
    password: '',
    shopname: '',
    shopemail: '',
    GSTINnumber: '',
    PANnumber: '',
    productId: '',
    address: '',
  });
  const [workerDetails, setWorkerDetails] = useState({
    email: '',
    password: '',
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
    const response = await fetch('http://localhost:3000/becomeSeller', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(sellerDetails),
    });
    const data = await response.json();
  };
  const handleWorkerSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/becomeWorker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(workerDetails),
    });
    const data = await response.json();
  };
  const [productDetails, setProductDetails] = useState({
    title: '',
    description: '',
    price: '',
    images: '',
    category: '',
    quantity: '',
    bid: false,
    bidPrice: '',
    bidEnd: '',
  });
  const handleProductDetailsChange = (event) => {
    setProductDetails({
      ...productDetails,
      [event.target.name]: event.target.value,
    });
  };




  return (
    <>
      <Header />
      <Center>
        {userType === "notverified" && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Verification Pending</h1>
            <p>Your account is currently being verified. This process may take some time.</p>
            <p>Please check back later.</p>
          </div>
        )}
        {userType === "user" && (
          <div>
            <p>Would you like to become a seller or a worker?</p>
            <button onClick={handleBecomeSeller}>Become a Seller</button>
            <button onClick={handleBecomeWorker}>Become a Worker</button>
            {role === 'seller' && (
              <div>
                <Input type="text" name="shopname" value={sellerDetails.shopname} onChange={handleSellerDetailsChange} placeholder="Shop Name" required />
                <Input type="text" name="shopemail" value={sellerDetails.shopemail} onChange={handleSellerDetailsChange} placeholder="Shop Email" required />
                <Input type="text" name="GSTINnumber" value={sellerDetails.GSTINnumber} onChange={handleSellerDetailsChange} placeholder="GSTIN Number" required />
                <Input type="text" name="PANnumber" value={sellerDetails.PANnumber} onChange={handleSellerDetailsChange} placeholder="PAN Number" required />
                <Input type="text" name="address" value={sellerDetails.address} onChange={handleSellerDetailsChange} placeholder="Address" required />
                <button onClick={handleSellerSubmit}>Submit</button>
              </div>
            )}
            {role === 'worker' && (
              <div>
                <Input type="text" name="adhaar" value={workerDetails.adhaar} onChange={handleWorkerDetailsChange} placeholder="Adhaar" required />
                <button onClick={handleWorkerSubmit}>Submit</button>
              </div>
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
          <AdminPanel adminEmail="admin@gmail.com" />
        )}
      </Center>
    </>
  );
}