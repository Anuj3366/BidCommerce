import { useFeaturedProducts, useNewProducts } from "../Backend/client";
import Header from "../components/Appbar";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";

export default function HomePage() {
  console.log("HomePage started");
  console.log(useFeaturedProducts());
  const featuredProduct = useFeaturedProducts();
  const newProducts = useNewProducts();

  return (
    <div>
      <Header />
      {featuredProduct && <Featured product={featuredProduct} />}
      {newProducts && <NewProducts products={newProducts} />}
    </div>
  );
}
