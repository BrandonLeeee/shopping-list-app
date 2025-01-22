const ShoppingItem = ({ itemName, itemPrice, itemImg, itemBrand, onClick }) => {
  return (
    <div className={"showcase-item"}>
      <img
        style={{ width: "120px" }}
        src="./src/assets/product-placeholder.png"
        alt="Product Placehold"
      />
      <div className={"wrap-showcase"}>
        <div className={"showcase-item-name"}>
          <span className={"showcase-item-brand"}>{itemBrand}</span>
          <p className={"showcase-item-title"}>{itemName}</p>
        </div>
        <div className={"Item-price-group"}>
          <span className={"price-value"}>{`$ ${itemPrice}`}</span>
        </div>
      </div>
      <button className={"showcase-button"} onClick={onClick}>
        Add to Cart
      </button>
    </div>
  );
};

export default ShoppingItem;
