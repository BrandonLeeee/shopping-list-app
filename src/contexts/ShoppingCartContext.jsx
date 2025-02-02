import { addUserOrder } from "@/services/firestoreService";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalCart, setTotalCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setShoppingCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item) => {
    setShoppingCart((prevCart) => {
      const existingItem = prevCart.some((prevItem) => prevItem.id === item.id);

      // If the item already in the cart, update the quantity
      if (existingItem) {
        return prevCart.map((prevItem) =>
          prevItem.id === item.id
            ? {
                id: item.id,
                title: item.title,
                thumbnail: item.thumbnail,
                price: item.price,
                qty: prevItem.qty + 1,
              }
            : prevItem
        );
      } else {
        // Add a new item
        return [
          ...prevCart,
          {
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            price: item.price,
            qty: 1,
          },
        ];
      }
    });
  };

  const incrementQty = (id) => {
    setShoppingCart((prevCart) =>
      prevCart.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, qty: prevItem.qty + 1 } : prevItem
      )
    );
  };

  const decrementQty = (id) => {
    setShoppingCart((prevCart) =>
      prevCart
        .map((prevItem) =>
          prevItem.id === id ? { ...prevItem, qty: prevItem.qty - 1 } : prevItem
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setShoppingCart([]);
    localStorage.removeItem("cart");
  };

  const postOrder = async (userId) => {
    await addUserOrder(userId, { items: shoppingCart, totalCart });
    clearCart();
  };

  // Update the total amount of the cart
  useEffect(() => {
    if (shoppingCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(shoppingCart));
    }
    const newTotal = shoppingCart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    setTotalCart(newTotal.toFixed(2));
  }, [shoppingCart]);

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        totalCart,
        addToCart,
        incrementQty,
        decrementQty,
        postOrder,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
