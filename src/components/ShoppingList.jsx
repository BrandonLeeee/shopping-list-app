import React, { useContext, useState } from "react";
import ShoppingItem from "./ShoppingItem";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const ShoppingList = () => {
  const { addToCart, itemsList } = useContext(ShoppingCartContext);

  const handeAddToCart = (item) => {
    addToCart(item);
  };
  return (
    <div className={"items-container"}>
      <div className={"container-items"}>
        {itemsList.map((item) => (
          <ShoppingItem
            key={item.id}
            itemName={item.title}
            itemPrice={item.price}
            itemBrand={item.brand}
            itemImg={item.thumbnail}
            onClick={() => handeAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
