import React from "react";
import useFetch from "../hooks/useFetch";
import ShoppingItemCategory from "./ShoppingItemCategory";

const ShoppingCategory = () => {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch("https://dummyjson.com/products/categories/");

  const categoryImages = {
    0: "https://www.regentsparkpharmacy.com.au/cdn/shop/files/larocheposay_mela_b3_serum.png?v=1722499055&width=1214",
    1: "https://mengotticouture.com/wp-content/uploads/2022/12/CHANEL-No-5-EAU-DE-PARFUM-SPRAY-35ML-FOR-WOMEN-1.png",
    2: "https://static.vecteezy.com/system/resources/thumbnails/034/629/699/small_2x/stylish-scandinavian-style-armchair-with-mint-green-upholstery-wooden-legs-perfect-for-modern-home-interior-lounge-chair-on-transparent-background-cut-out-furniture-front-view-ai-generated-png.png",
    3: "https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-assorted-grocery-items-in-a-plastic-png-image_10536645.png",
    4: "https://static.vecteezy.com/system/resources/thumbnails/047/433/963/small_2x/green-plant-in-pot-on-transparent-background-png.png",
    5: "https://atlas-content-cdn.pixelsquid.com/assets_v2/10/1024073280933336794/jpeg-600/G11.jpg?modifiedAt=1",
  };

  return (
    <div className="flex-column">
      <h3 className="text-xl">
        Shop from <span className="text-blue-400">Categories</span>
      </h3>
      <div className="underline"></div>
      <div className="categories-container">
        {categoriesLoading ? (
          <span>Loading...</span>
        ) : (
          categoriesData
            .slice(0, 6)
            .map((category, index) => (
              <ShoppingItemCategory
                key={index}
                categorySlug={category.slug}
                categoryName={category.name}
                categoryImg={categoryImages[index]}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default ShoppingCategory;
