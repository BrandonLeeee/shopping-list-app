import { useEffect, useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { Toaster } from "sonner";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Header = () => {
  const { shoppingCart } = useContext(ShoppingCartContext);
  const [count, setCount] = useState(0);

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
      <header className="header">
        <div className="container">
          <Link to="/" className="link">
            <h1 className="logo">LeeTech</h1>
          </Link>
          <div className="">
            <input
              className="flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:w-[100px] lg:w-[400px]"
              type="text"
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

      <div>
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};

export default Header;
