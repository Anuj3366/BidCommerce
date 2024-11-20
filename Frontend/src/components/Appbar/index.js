"use client";
import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useState } from "react";
import CloseIcon from "@/components/icons/Close";
import BarsIcon from "@/components/icons/Bars";
import { Toaster, toast } from 'sonner'


const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  z-index: 9999;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 191;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header({isLoggedIn, setIsLoggedIn}) {
  // const [mobileNavActive, setMobileNavActive] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Logout failed. Please try again.');
      }
      setIsLoggedIn(false);
      toast.success('You are now logged out');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Toaster />
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={'/'}>BidCommerce</Logo>
            <StyledNav>
              <NavLink href={"/"}>Home</NavLink>
              <NavLink href={"/Auction"}>Auction</NavLink>
              <NavLink href={"/categories"}>Categories</NavLink>
              <NavLink href={"/Cart"}>Cart</NavLink>
              {isLoggedIn ? (
                <>
                  <NavLink href={"/Account"}>Account</NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink href={"/Login"}>Login</NavLink>
                  <NavLink href={"/Signup"}>SignUp</NavLink>
                </>
              )}
            </StyledNav>
            {/* <NavButton>
              {mobileNavActive ? <CloseIcon /> : <BarsIcon />}
            </NavButton> */}
          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  );
}