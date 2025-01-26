import React from "react";
import ShoppingList from "../components/ShoppingList";
import ShoppingCategory from "../components/ShoppingCategory";
import TopBrands from "@/components/TopBrands";

const Home = () => {
  return (
    <div>
      <ShoppingList />
      <ShoppingCategory />
      <TopBrands />
    </div>
  );
};

export default Home;
