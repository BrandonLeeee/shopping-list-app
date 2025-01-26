import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { Button } from "./ui/button";

const ShoppingCart = () => {
  const { shoppingCart, totalCart, incrementQty, decrementQty } =
    useContext(ShoppingCartContext);

  return (
    <div className="w-full h-[90vh] p-5 flex flex-col justify-center items-center ">
      <div className="w-full h-full p-5 flex flex-col justify-center items-center">
        <h3 className="font-bold text-4xl mb-7">Shopping Cart</h3>
        {shoppingCart.length > 0 ? (
          <div>
            {shoppingCart.map((item, index) => (
              <div key={item.id} className="max-h-custom180 h-full">
                <div
                  className={`flex justify-between gap-5 items-center ${
                    index === 0 ? "border-t" : ""
                  } border-b border-l-0 border-r-0 pt-4 pb-4 h-full`}
                >
                  <img
                    className="w-1/4 h-auto bg-gray-200 rounded-md"
                    src={item.thumbnail}
                    alt=""
                  />
                  <p className="text-md">{item.title}</p>
                  <div className="flex flex-col items-center justify-between h-full">
                    <p className="text-xl">{`$ ${item.price}`}</p>

                    <div>
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
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between content-center items-center">
              <div className="flex justify-between content-center items-center py-8">
                <div className="">Total:</div>
                <div className="">{`$ ${totalCart}`}</div>
              </div>
              <div>
                <Button className="">Go to checkout</Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="p-5">Your cart is empty.</p>
            <div>
              <Button className="">Continue Shopping</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
