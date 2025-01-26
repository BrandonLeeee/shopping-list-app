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
          <div className="search-input">
            <input type="text" placeholder="Search product" />
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
