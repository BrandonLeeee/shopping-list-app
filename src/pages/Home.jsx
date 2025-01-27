import ShoppingList from "../components/ShoppingList";
import ShoppingCategory from "../components/ShoppingCategory";
import TopBrands from "@/components/TopBrands";
import { useContext } from "react";
import { SearchContext } from "@/contexts/SearchContext";
import SearchResults from "./SearchResuts";

const Home = () => {
  const useSearch = () => useContext(SearchContext);
  const { search } = useSearch();

  return (
    <>
      <div>
        <ShoppingList />
        <ShoppingCategory />
        <TopBrands />
      </div>
    </>
  );
};

export default Home;
