import { useContext } from "react";
import ShoppingItem from "./ShoppingItem";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { itemsList } from "../data/Products";

const ShoppingList = () => {
  const { addToCart } = useContext(ShoppingCartContext);

  const handeAddToCart = (item) => {
    addToCart(item);
  };
  return (
    <div className={"items-container"}>
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
  );
};

export default ShoppingList;
