import { categoryImages } from "@/assets/categoryImages";
import { useLoading } from "@/contexts/LoadingContext";
import useFetch from "../../hooks/useFetch";
import ShoppingItemCategory from "./ShoppingItemCategory";
import { Skeleton } from "../ui/skeleton";

const ShoppingCategory = () => {
  const { data, loading, isFetching, error } = useFetch(
    "https://dummyjson.com/products/categories/"
  );

  const skeleton = () => {
    return [...Array(6)].map((_, i) => (
      <div key={i} className="showcase-category">
        <Skeleton
          key={i}
          className="h-[200px] w-[200px] rounded-full mb-3 animate-pulse"
        />
      </div>
    ));
  };
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div></div>;

  return (
    <div className="flex-column">
      <h3 className="text-start mt-4 mb-1.5 text-xl">
        Shop from <span className="text-blue-400">Categories</span>
      </h3>
      <div className="underline bg-gray-200"></div>
      <div className="categories-container">
        {isFetching
          ? skeleton()
          : data
              .slice(0, 6)
              .map((category, index) => (
                <ShoppingItemCategory
                  key={index}
                  categorySlug={category.slug}
                  categoryName={category.name}
                  categoryImg={categoryImages[index]}
                />
              ))}
      </div>
    </div>
  );
};

export default ShoppingCategory;
