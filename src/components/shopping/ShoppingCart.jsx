import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { Button, buttonVariants } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import IsLoading from "../ui/IsLoading";
import { toast } from "sonner";

const ShoppingCart = () => {
  const {
    shoppingCart,
    totalCart,
    incrementQty,
    decrementQty,
    clearCart,
    postOrder,
  } = useContext(ShoppingCartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading } = useLoading();
  const handleAddOrder = (e) => {
    e.preventDefault();
    if (user) {
      postOrder(user.id);
    } else {
      navigate("/login");
    }
  };

  const handleClearCart = (e) => {
    e.preventDefault();
    clearCart();
    toast("All items have been removed from your cart!", { duration: 2000 });
  };

  return (
    <>
      {loading ? (
        <div className="min-h-[70vh] sm:min-h-90 flex flex-col gap-4 justify-center items-center">
          Processing your order...
          <IsLoading />
        </div>
      ) : (
        <div className="w-full p-5 flex flex-col justify-center items-center ">
          <div className="w-full h-full p-5 flex flex-col justify-center items-center">
            {shoppingCart.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-7">
                  <h3 className="font-bold text-4xl">Shopping Cart</h3>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={handleClearCart}
                  >
                    Remove All
                  </Button>
                </div>
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
                    <Button onClick={handleAddOrder}>Go to checkout</Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-bold text-4xl">Shopping Cart</h3>

                <p className="p-5">Your cart is empty.</p>
                <div>
                  <Link to="/" className={buttonVariants()}>
                    Continue Shopping
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
