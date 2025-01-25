import React from "react";
import useFetch from "../hooks/useFetch";
import ShoppingItemCategory from "./ShoppingItemCategory";

const ShoppingCategory = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("https://dummyjson.com/products/categories/");

  return (
    <div className="flex-row">
      <h3 className="section-title">
        Shop from <span className="highlight">Categories</span>
      </h3>
      <div className="underline"></div>
      <div className="categories-container">
        {categoriesLoading ? (
          <span>Loading...</span>
        ) : (
          categoriesData
            .slice(0, 6)
            .map((category, index) => (
              <ShoppingItemCategory key={index} categoryName={category.name} />
            ))
        )}
      </div>
    </div>
  );
};

export default ShoppingCategory;
