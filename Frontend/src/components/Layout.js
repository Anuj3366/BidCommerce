"use client";
import React from 'react';
import Header from './Appbar';
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    fetch('https://bidcommerce.onrender.com/isLogin', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn);
      });
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
