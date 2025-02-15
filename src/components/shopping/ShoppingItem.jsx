import { Button } from "../ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "@/contexts/SearchContext";

const ShoppingItem = ({ item, onClick }) => {
  const navigate = useNavigate();

  const { setSearch } = useContext(SearchContext);
  const handleClick = () => {
    onClick();
    toast.success(`${item.title} was successfully added!`, {
      duration: 2000,
    });
  };

  const handleNavigate = (id) => {
    navigate(`/item/${item.id}`);
    setSearch("");
  };

  return (
    <div className="showcase-item">
      <img
        className="showcase-img"
        src={item.thumbnail}
        alt="Product Placehold"
        onClick={() => handleNavigate(item.id)}
      />
      <div className="showcase-wrapper">
        <div className="showcase-item-name">
          <span className="showcase-item-brand">{item.brand}</span>
          <p className="showcase-item-title">{item.title}</p>
        </div>
        <div className="item-price-group">
          <span className="price-value">{`$ ${item.price}`}</span>
        </div>
      </div>
      <Button size="sm" className="showcase-button" onClick={handleClick}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ShoppingItem;
