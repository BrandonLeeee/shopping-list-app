import { Button } from "./ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "@/contexts/SearchContext";

const ShoppingItem = ({
  itemId,
  itemName,
  itemPrice,
  itemImg,
  itemBrand,
  onClick,
}) => {
  const navigate = useNavigate();

  const { setSearch } = useContext(SearchContext);

  const handleClick = () => {
    onClick();
    toast(`${itemName} has been added!`, {
      duration: 2000,
    });
  };

  const handleNavigate = (itemId) => {
    navigate(`/item/${itemId}`);
    setSearch("");
  };

  return (
    <div className="showcase-item">
      <img
        className="showcase-img"
        src={itemImg}
        alt="Product Placehold"
        onClick={() => handleNavigate(itemId)}
      />
      <div className="showcase-wrapper">
        <div className="showcase-item-name">
          <span className="showcase-item-brand">{itemBrand}</span>
          <p className="showcase-item-title">{itemName}</p>
        </div>
        <div className="item-price-group">
          <span className="price-value">{`$ ${itemPrice}`}</span>
        </div>
      </div>
      <Button size="sm" className="showcase-button" onClick={handleClick}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ShoppingItem;
