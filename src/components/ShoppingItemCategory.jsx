import React from "react";

const ShoppingItemCategory = ({ categoryName, categoryImg }) => {
  return (
    <div className="showcase-category">
      <img src={categoryImg} alt="" />
      <p>{categoryName}</p>
    </div>
  );
};

export default ShoppingItemCategory;
