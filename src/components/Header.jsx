import { useEffect, useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { Toaster } from "sonner";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SearchContext } from "@/contexts/SearchContext";
import SearchResults from "@/pages/SearchResuts";

const Header = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [count, setCount] = useState(0);
  const useSearch = () => useContext(SearchContext);
  const { search, onSearchChange } = useSearch();

  {
    /*Update badge counter */
  }
  useEffect(() => {
    if (shoppingCart.length === 0) {
      setCount(0);
      return;
    }

    const badgeCount = shoppingCart.reduce(
      (total, item) => total + item.qty,
      0
    );

    setCount(badgeCount);
  }, [shoppingCart]);

  return (
    <>
      <header className="py-2 360:py-5 bg-gray-200">
        <div className="flex flex-col items-center justify-between 360:flex-row 360:justify-between max-w-[1382px] mx-auto px-2 360:py-0 360:px-5">
          <Link to="/" className="link">
            <h1 className="text-4xl font-semibold mb-3 360:mb-0">LeeTech</h1>
          </Link>
          <div className="w-full mx-4">
            <input
              className="flex h-9 mb-3 360:mb-0 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  min-w-[130px] max-w-[400px] mx-auto"
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="Search product"
            />
          </div>

          <div className="user-actions">
            <Link to="/" className="account">
              <div className="icon">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Notifications"
                >
                  <CiUser />
                </Button>
              </div>
              <p>Account</p>
            </Link>
            <Link to="/cart" className="cart">
              <Button
                variant="outline"
                size="icon"
                className="relative icon"
                aria-label="Cart"
              >
                <MdShoppingCart size={16} strokeWidth={0} />
                {count > 0 && (
                  <Badge className="absolute -top-3 -right-2 px-1.5 rounded-full">
                    {count > 99 ? "99+" : count}
                  </Badge>
                )}
              </Button>
              <p>Cart</p>
            </Link>
          </div>
        </div>
      </header>

      {search.length > 0 ? <SearchResults extQuery={search} /> : <Outlet />}

      <Toaster />
    </>
  );
};

export default Header;
