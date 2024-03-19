"use client";
import React from 'react';
import Header from './Appbar';
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    fetch('http://65.0.145.134:3000/isLogin', {
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
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn ={setIsLoggedIn} />
      {children}
    </>
  );
};

export default Layout;
