import React from "react";
import { useNavigate } from "react-router-dom";

const ShoppingItemCategory = ({ categoryName, categoryImg, categorySlug }) => {
  const navigate = useNavigate();

  const handleNavigate = (categorySlug) => {
    navigate(`/category/${categorySlug}`);
  };

  return (
    <div className="showcase-category">
      <img
        src={categoryImg}
        alt=""
        onClick={() => handleNavigate(categorySlug)}
      />
      <p>{categoryName}</p>
    </div>
  );
};

export default ShoppingItemCategory;
