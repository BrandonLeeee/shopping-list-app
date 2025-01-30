import "./GlobalStyle.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ItemDetails from "./pages/ItemDetails";
import ItemsByCategory from "./pages/ItemsByCategory";
import Providers from "./app/Providers";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/item/:urlId" element={<ItemDetails />} />
            <Route
              path="/category/:categorySlug"
              element={<ItemsByCategory />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;
