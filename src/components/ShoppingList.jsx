import { useContext } from "react";
import ShoppingItem from "./ShoppingItem";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import useFetch from "../hooks/useFetch";
import IsLoading from "./IsLoading";
import { useLoading } from "@/contexts/LoadingContext";

const ShoppingList = () => {
  const { data, error } = useFetch(
    "https://dummyjson.com/products/category/laptops"
  );
  const { loading } = useLoading();

  const { addToCart } = useContext(ShoppingCartContext);

  const handeAddToCart = (item) => {
    addToCart(item);
  };

  if (loading) return <div></div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div></div>;

  return (
    <>
      <div className="flex-column">
        <div className="section-title">
          <h3 className="text-start mt-4 mb-1.5 text-xl">
            Grab the <span className="text-blue-400">Best deals</span>
          </h3>
          <div className="underline bg-gray-200"></div>
        </div>
        <div className={"items-container"}>
          {data.products.map((item) => (
            <ShoppingItem
              key={item.id}
              itemId={item.id}
              itemName={item.title}
              itemPrice={item.price}
              itemBrand={item.brand}
              itemImg={item.thumbnail}
              onClick={() => handeAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShoppingList;
