import ShoppingList from "../components/ShoppingList";
import ShoppingCategory from "../components/ShoppingCategory";
import TopBrands from "@/components/TopBrands";
import IsLoading from "@/components/IsLoading";
import { useLoading } from "@/contexts/LoadingContext";

const Home = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading ? (
        <div className="min-h-90 flex justify-center items-center">
          {" "}
          <IsLoading />
        </div>
      ) : (
        <div>
          <ShoppingList />
          <ShoppingCategory />
          <TopBrands />
        </div>
      )}
    </>
  );
};

export default Home;
