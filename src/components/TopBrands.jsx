import React from "react";

const TopBrands = () => {
  const topBrands = [
    {
      brand: "Apple",
      thumbnail:
        "https://media.binglee.com.au/a/7/a/f/a7af92b376ef365bc110ef090feb7c58a4d0545b_Apple_MU773ZPA_Mobile_Phone_Banner_1.jpg",
    },
    {
      brand: "Samsung",
      thumbnail:
        "https://images.ctfassets.net/xa93kvziwaye/7i2yrssuwpONBvlN6jZH20/8d0caedab6fd584e738e604bb22faf97/jb-au-20250123-mobile-phones-samsung-s25-preorder_carousel_mobile.jpg?fm=webp&f=top&fit=fill&w=1124&h=482",
    },
    {
      brand: "Xiaomi",
      thumbnail:
        "https://media-cdn.bnn.in.th/189917/Shop-By-Brand-CoverPage_XiaoMi-category_banner_medium.jpg",
    },
  ];

  return (
    <div className="flex-column">
      <h3 className="text-xl">
        Top <span className="text-blue-400">Eletronics Brand</span>
      </h3>
      <div className="underline"></div>
      <div className="showcase-brand">
        {topBrands.map((brand, index) => (
          <div key={index}>
            <img
              className="brand-img"
              src={brand.thumbnail}
              alt={brand.brand}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBrands;
