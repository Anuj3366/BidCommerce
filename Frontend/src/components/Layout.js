"use client";
import React from 'react';
import Header from './Appbar';
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/isLogin', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          console.error('HTTP error:', response.status);
          return;
        }
        const data = await response.json();
        setIsLoggedIn(data?.isLoggedIn);
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div id="root"></div>
      {children}
    </>
  );
};

export default Layout;
