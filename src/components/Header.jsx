import { AuthContext } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { SearchContext } from "@/contexts/SearchContext";
import SearchResults from "@/pages/SearchResuts";
import { useContext, useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { MdOutlineLogout, MdShoppingCart } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import IsLoading from "./ui/IsLoading";

const Header = () => {
  const [count, setCount] = useState(0);
  const useSearch = () => useContext(SearchContext);
  const { search, onSearchChange } = useSearch();
  const { user, handleSignOut } = useContext(AuthContext);
  const { loading } = useLoading();
  const { shoppingCart } = useContext(ShoppingCartContext);

  //Update badge counter
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

  const renderContent = () => {
    if (loading) {
      return <IsLoading />;
    }
    if (user && user.name) {
      return <p className="hidden 530:block">{user.name.split(" ")[0]}</p>;
    }

    return <p className="hidden 530:block">Account</p>;
  };

  return (
    <>
      <header className="py-2 360:py-5 bg-gray-200">
        <div className="flex flex-col items-center justify-between xs:flex-row 360:justify-between max-w-[1382px] mx-auto px-2 360:py-0 360:px-5">
          <Link to="/" className="link">
            <h1 className="text-4xl font-semibold mb-3 xs:mb-0">LeeTech</h1>
          </Link>
          <div className="w-full mx-4">
            <input
              className="flex h-9 mb-3 xs:mb-0 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  min-w-[130px] max-w-[400px] mx-auto"
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="Search product"
            />
          </div>

          <div className="user-actions">
            <div className="flex items-center">
              <Link to={user ? "/account" : "/login"} className="account">
                <div className="icon">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Notifications"
                  >
                    <CiUser />
                  </Button>
                </div>
                {renderContent()}
              </Link>
              {user && (
                <p className="cursor-pointer">
                  <MdOutlineLogout onClick={handleSignOut} />
                </p>
              )}
            </div>
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
              <p className="hidden 530:block">Cart</p>
            </Link>
          </div>
        </div>
      </header>

      {search.length > 0 ? <SearchResults extQuery={search} /> : <Outlet />}
    </>
  );
};

export default Header;
