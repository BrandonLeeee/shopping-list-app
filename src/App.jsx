import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import "./GlobalStyle.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ItemDetails from "./pages/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
