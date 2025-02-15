import { AuthProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AuthProvider>
          <SearchProvider>
            <ShoppingCartProvider>{children}</ShoppingCartProvider>
          </SearchProvider>
        </AuthProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
};

export default Providers;
