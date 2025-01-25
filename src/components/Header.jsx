import React from "react";
import { Outlet, Link } from "react-router-dom";
import { MdAccountCircle, MdShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="link">
            <h1 className="logo">LoremTech</h1>
          </Link>

          <div className="user-actions">
            <Link to="/" className="account">
              <div className="icon">
                <MdAccountCircle />
              </div>
              <p>Account</p>
            </Link>
            <Link to="/cart" className="cart">
              <div className="icon">
                <MdShoppingCart />
              </div>
              <p>Cart</p>
            </Link>
          </div>
        </div>
      </header>

      <div className={"main-container"}>
        <Outlet />
      </div>
    </>
  );
};

export default Header;
