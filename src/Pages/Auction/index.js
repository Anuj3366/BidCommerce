import Header from "../../components/Appbar";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage() {
  var products = {};
  fetch("http://localhost:3000/getAll/getAllAuction", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .then(data => {
    products = data;
  });
  return (
    <>
      <Header />
      <Center>
        <Title>All Auctions</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}