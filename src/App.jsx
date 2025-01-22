import ShoppingList from "./components/ShoppingList";
import ShoppingCart from "./components/ShoppingCart";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import "./GlobalStyle.css";

function App() {
  return (
    <ShoppingCartProvider>
      <div>
        <h1 className={"title"}>Shopping List</h1>
        <div className={"main-container"}>
          <ShoppingList />
          <ShoppingCart />
        </div>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
