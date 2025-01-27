import { useContext } from "react";
import ShoppingItem from "../components/ShoppingItem";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import useFetch from "../hooks/useFetch";
import IsLoading from "../components/IsLoading";

const SearchResults = ({ extQuery }) => {
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/search?q=${extQuery}`
  );
  const { addToCart } = useContext(ShoppingCartContext);

  const handeAddToCart = (item) => {
    addToCart(item);
  };

  if (loading)
    return (
      <div>
        <IsLoading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <>
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className={"items-container mt-5 px-5"}>
          {data.products.length === 0 ? (
            <p className="text-xl">
              We could not find what you are looking for. Need help?{" "}
              <a href="/#" className="text-blue-400">
                Contact us
              </a>
              .
            </p>
          ) : (
            data.products.map((item) => (
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

export default SearchResults;
