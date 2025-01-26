import { useContext } from "react";
import ShoppingItem from "./ShoppingItem";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import useFetch from "../hooks/useFetch";

const ShoppingList = () => {
  const {
    data: laptopData,
    loading: laptopLoading,
    error: laptopError,
  } = useFetch("https://dummyjson.com/products/category/laptops");

  const { addToCart } = useContext(ShoppingCartContext);

  const handeAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <>
      <div className="flex-column">
        <div className="section-title">
          <h3>
            Grab the <span className="highlight">Best deals</span>
          </h3>
          <div className="underline"></div>
        </div>
        <div className={"items-container"}>
          {laptopLoading ? (
            <span>Loading...</span>
          ) : (
            laptopData.products.map((item) => (
              <ShoppingItem
                key={item.id}
                itemId={item.id}
                itemName={item.title}
                itemPrice={item.price}
                itemBrand={item.brand}
                itemImg={item.thumbnail}
                onClick={() => handeAddToCart(item)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingList;
