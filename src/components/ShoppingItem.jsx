const ShoppingItem = ({ itemName, itemPrice, itemImg, itemBrand, onClick }) => {
  return (
    <div className="showcase-item">
      <img className="showcase-img" src={itemImg} alt="Product Placehold" />
      <div className="showcase-wrapper">
        <div className="showcase-item-name">
          <span className="showcase-item-brand">{itemBrand}</span>
          <p className="showcase-item-title">{itemName}</p>
        </div>
        <div className="item-price-group">
          <span className="price-value">{`$ ${itemPrice}`}</span>
        </div>
      </div>
      <button className="showcase-button" onClick={onClick}>
        Add to Cart
      </button>
    </div>
  );
};

export default ShoppingItem;
