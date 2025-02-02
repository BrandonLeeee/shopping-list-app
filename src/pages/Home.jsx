import ShoppingList from "../components/shopping/ShoppingList";
import ShoppingCategory from "../components/shopping/ShoppingCategory";
import TopBrands from "@/components/TopBrands";
import IsLoading from "@/components/ui/IsLoading";
import { useLoading } from "@/contexts/LoadingContext";

const Home = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading ? (
        <div className="min-h-[70vh] sm:min-h-90 flex justify-center items-center">
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
