import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const itemsList = [
    {
      id: 121,
      title: "iPhone 5s",
      brand: "Apple",
      price: 199.99,
      stock: 65,
    },
    {
      id: 122,
      title: "iPhone 6",
      brand: "Apple",
      price: 299.99,
      stock: 99,
    },
    {
      id: 123,
      title: "iPhone 13 Pro",
      brand: "Apple",
      price: 1099.99,
      stock: 26,
    },
    {
      id: 124,
      title: "iPhone X",
      brand: "Apple",
      price: 899.99,
      stock: 99,
    },
    {
      id: 125,
      title: "Oppo A57",
      brand: "Oppo",
      price: 249.99,
      stock: 76,
    },
    {
      id: 126,
      title: "Oppo F19 Pro Plus",
      brand: "Oppo",
      price: 399.99,
      stock: 92,
    },
  ];

  const addToCart = (item) => {
    setShoppingCart((prevCart) => {
      const existingItem = prevCart.some((prevItem) => prevItem.id === item.id);

      if (existingItem) {
        return prevCart.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, qty: prevItem.qty + 1 }
            : prevItem
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ shoppingCart, itemsList, addToCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
