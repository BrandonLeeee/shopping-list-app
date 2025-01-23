import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const ShoppingCart = () => {
  const { shoppingCart, totalCart, incrementQty, decrementQty } =
    useContext(ShoppingCartContext);

  return (
    <div className={"shopping-cart-container"}>
      <div>
        <h3>Shopping Cart</h3>
        <div className={"cart-title-header"}>
          <p className={"cart-title-p"}>Product</p>
          <p className={"cart-title-p"}>Qty</p>
          <p className={"cart-title-p"}>Price</p>
        </div>
        {shoppingCart.length > 0 ? (
          shoppingCart.map((item) => (
            <div className={"cart-to-buy"} key={item.id}>
              <p className={"cart-item-name"}>{item.title}</p>
              <div className={"cart-item-name"}>
                <button
                  className={"cart-qty-button"}
                  onClick={() => decrementQty(item.id)}
                >
                  -
                </button>
                <span className={"cart-qty"}>{item.qty}</span>
                <button
                  className={"cart-qty-button"}
                  onClick={() => incrementQty(item.id)}
                >
                  +
                </button>
              </div>
              <p className={"cart-item-name"}>{`$ ${item.price}`}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
        <div className={"cart-total-container"}>
          <div className={"cart-total-title"}>
            <div className={"cart-total-text"}>Total:</div>
            <div className={"cart-total-value"}>{`$${totalCart}`}</div>
          </div>
          <div className={"cart-total-button"}>
            {shoppingCart.length > 0 ? (
              <button className={"cart-checkout-button"}>Go to checkout</button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
