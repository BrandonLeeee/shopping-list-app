import React, { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === "") return;
  }, [search]);

  return (
    <SearchContext.Provider value={{ search, setSearch, onSearchChange }}>
      {children}
    </SearchContext.Provider>
  );
};
