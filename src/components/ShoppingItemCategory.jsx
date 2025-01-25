import React from "react";

const ShoppingItemCategory = ({ categoryName }) => {
  return (
    <div className="showcase-category">
      <img src="https://dummyjson.com/image/150x150" alt="" />
      <p>{categoryName}</p>
    </div>
  );
};

export default ShoppingItemCategory;
