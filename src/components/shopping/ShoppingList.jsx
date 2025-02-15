import { useLoading } from "@/contexts/LoadingContext";
import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import useFetch from "../../hooks/useFetch";
import ShoppingItem from "./ShoppingItem";
import { Skeleton } from "../ui/skeleton";

const ShoppingList = () => {
  const { data, loading, isFetching, error } = useFetch(
    "https://dummyjson.com/products/category/laptops"
  );

  const { addToCart } = useContext(ShoppingCartContext);

  const handeAddToCart = (item) => {
    addToCart(item);
  };
  const skeleton = () => {
    return [...Array(5)].map((_, i) => (
      <Skeleton key={i} className="h-[346px] w-[198px] rounded animate-pulse" />
    ));
  };
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
          {isFetching
            ? skeleton()
            : data.products.map((item) => (
                <ShoppingItem
                  key={item.id}
                  item={item}
                  onClick={() => handeAddToCart(item)}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default ShoppingList;
