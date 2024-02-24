import Header from "../../components/Appbar";
import NavLinks from "../../components/NavLinks";
import Input from "@/components/Input";
export default function ProductsPage() {
  var userType = {};
  fetch('http://localhost:1234/getuserType', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  },).then(response => response.json()).then(data => {
    userType = data;
  });
  return (
    <>
    <Header />

    if(userType == "moderator"){
      <NavLinks>Admin</NavLinks>
    }
    else if(userType == "moderator"){
      <NavLinks>Moderator</NavLinks>
    }
    else if(userType == "seller"){
      <NavLinks>Seller</NavLinks>
    }
    </>
  );
}