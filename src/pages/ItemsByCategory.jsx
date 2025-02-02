import IsLoading from "@/components/ui/IsLoading";
import ShoppingItem from "@/components/shopping/ShoppingItem";
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import useFetch from "@/hooks/useFetch";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const ItemsByCategory = () => {
  const { categorySlug } = useParams();
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/category/${categorySlug}`
  );

  const { addToCart } = useContext(ShoppingCartContext);

  const handeAddToCart = (item) => {
    addToCart(item);
  };

  if (loading)
    return (
      <div className="min-h-[70vh] sm:min-h-90 flex justify-center items-center">
        <IsLoading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <>
      <div className="flex-column">
        <div className="section-title">
          <h3 className="text-start text-xl mt-4 mb-1.5">
            Grab the{" "}
            <span className="highlight">
              {" "}
              best deals on{" "}
              <span className="capitalize">{data.products[0].category}</span>
            </span>
          </h3>
          <div className="underline bg-gray-200"></div>
        </div>
        <div className={"items-container"}>
          {loading ? (
            <span>Loading...</span>
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

export default ItemsByCategory;
