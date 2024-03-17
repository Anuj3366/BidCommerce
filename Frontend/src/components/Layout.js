"use client";
import React from 'react';
import Header from './Appbar';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
