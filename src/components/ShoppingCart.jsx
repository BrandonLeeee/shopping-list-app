import { useContext } from "react";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const ShoppingCart = () => {
  const { shoppingCart, totalCart, incrementQty, decrementQty } =
    useContext(ShoppingCartContext);

  return (
    <div className="w-full p-5 flex flex-col justify-center items-center ">
      <div className="w-full h-full p-5 flex flex-col justify-center items-center">
        <h3 className="font-bold text-4xl mb-7">Shopping Cart</h3>
        {shoppingCart.length > 0 ? (
          <div>
            {shoppingCart.map((item, index) => (
              <div key={item.id} className="max-h-custom180">
                <div
                  className={`flex justify-between gap-4 items-center ${
                    index === 0 ? "border-t" : ""
                  } border-b border-l-0 border-r-0 pt-4 pb-4`}
                >
                  <img
                    className="w-1/4 max-h-custom180 bg-gray-200 rounded-md"
                    src={item.thumbnail}
                    alt=""
                  />
                  <p className="text-md">{item.title}</p>
                  <div className="flex flex-col items-center justify-between h-full">
                    <p className="sm:text-xl">{`$ ${item.price}`}</p>

                    <div className="inline-flex -space-x-px rounded-full shadow-sm shadow-black/5 rtl:space-x-reverse">
                      <Button
                        className="rounded-none shadow-none first:rounded-s-full last:rounded-e-full focus-visible:z-10"
                        size="icon"
                        onClick={() => incrementQty(item.id)}
                        aria-label="Upvote"
                      >
                        <ChevronUp
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </Button>
                      <span className="flex items-center bg-zinc-900 px-1 text-sm font-medium text-zinc-50">
                        {item.qty}
                      </span>
                      <Button
                        className="rounded-none shadow-none first:rounded-s-full last:rounded-e-full focus-visible:z-10"
                        size="icon"
                        onClick={() => decrementQty(item.id)}
                        aria-label="Downvote"
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-between items-center">
              <div className="flex max-w-50 w-full justify-between items-center py-8">
                <div className="text-lg">Total:</div>
                <div className="text-xl">{`$ ${totalCart}`}</div>
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
