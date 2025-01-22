import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const ShoppingCart = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);

  return (
    <div className={"shopping-cart-container"}>
      <div>
        <h3>Shopping Cart</h3>
        <div className={"cart-title-header"}>
          <p className={"cart-title-p"}>Product</p>
          <p className={"cart-title-p"}>Price</p>
          <p className={"cart-title-p"}>Qty</p>
        </div>
        {shoppingCart.length > 0 ? (
          shoppingCart.map((item) => (
            <div className={"cart-to-buy"} key={item.id}>
              <p className={"cart-item-name"}>{item.title}</p>
              <p className={"cart-item-name"}>{item.price}</p>
              <p className={"cart-item-name"}>{item.qty}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
