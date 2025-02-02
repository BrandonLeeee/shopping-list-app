import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch("");
  }, [location]);

  return (
    <SearchContext.Provider value={{ search, setSearch, onSearchChange }}>
      {children}
    </SearchContext.Provider>
  );
};
