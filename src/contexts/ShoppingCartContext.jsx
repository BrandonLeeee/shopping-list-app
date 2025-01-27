import { createContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState(() => {
    // Retrieve the cart from localStorage (or return an empty array if not found)
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [totalCart, setTotalCart] = useState([]);

  const addToCart = (item) => {
    setShoppingCart((prevCart) => {
      const existingItem = prevCart.some((prevItem) => prevItem.id === item.id);

      // If the item already in the cart, update the quantity
      if (existingItem) {
        return prevCart.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, qty: prevItem.qty + 1 }
            : prevItem
        );
      } else {
        // Add a new item
        return [...prevCart, { ...item, qty: 1 }];
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

  // Update the total amount of the cart & persist the cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
    const newTotal = shoppingCart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    setTotalCart(newTotal.toFixed(2));
  }, [shoppingCart]);

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCart, totalCart, addToCart, incrementQty, decrementQty }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
