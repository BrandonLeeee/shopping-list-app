import { SearchProvider } from "@/contexts/SearchContext";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";

const Providers = ({ children }) => {
  return (
    <SearchProvider>
      <ShoppingCartProvider>{children}</ShoppingCartProvider>
    </SearchProvider>
  );
};

export default Providers;
