import Header from "../../components/Appbar";
import Input from "@/components/Input";
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
export default function ProductsPage() {
  var userType = {};
  fetch('http://localhost:3000/getAll/getuserType', {
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