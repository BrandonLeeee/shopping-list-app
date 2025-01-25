import React from "react";
import ShoppingList from "../components/ShoppingList";
import ShoppingCategory from "../components/ShoppingCategory";

const Home = () => {
  return (
    <div>
      <ShoppingList />
      <ShoppingCategory />
    </div>
  );
};

export default Home;
