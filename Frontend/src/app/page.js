import Header from "../components/Appbar";
import Featured from "../components/Featured";
import NewProducts from "../components/NewProducts";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Featured />
      <NewProducts />
    </div>
  );
}

