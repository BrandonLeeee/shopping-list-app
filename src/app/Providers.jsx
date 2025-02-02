import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";

const Providers = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <SearchProvider>
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        </SearchProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default Providers;
