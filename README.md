# Shopping List App

This is a simple **React** application designed for practice and learning. It includes a shopping list of products and a shopping cart to simulate adding and viewing items. The project demonstrates the use of key React features such as `useState`, and `useContext`.

[Demo](https://shoppinglistlee.vercel.app/)
## Features

- **Dynamic Product Listing**: Display a list of products with details like name, brand, and price.
- **Add to Cart**: Users can add items to the shopping cart, with dynamic updates.
- **Shopping Cart**: A simple cart that displays the items added, including their name, price, and quantity.
- **React Hooks**:
  - `useState` for managing state like product lists and cart contents.
  - `useContext` for sharing cart data across components without prop drilling.

## Project Structure

```plaintext
src/
├── components/
│   ├── ShoppingCart.js       # Shows the shopping cart details.
│   ├── ShoppingItem.js       # Displays individual product information.
│   ├── ShoppingList.js       # Renders the list of products.
├── context/
│   ├── ShoppingCartContext.js  # Manages cart state and provides context.
├── assets/                  # Placeholder images or other assets.
├── GlobalStyle.css          # General styling for the app
...
```

Screenshots
![image](https://github.com/user-attachments/assets/7dd471e8-7984-43b5-ba78-cc2e4b9cd33d)

## Technologies Used

- **React**: Frontend framework.
- **CSS**: Basic styling for UI components.
- **Context API**: To manage shared state for the shopping cart.
- **React Hooks**: For state and lifecycle management.

## Future Improvements

- Add product filtering and sorting.
- Integrate a backend to fetch products dynamically.
- Persist cart data in localStorage or a database.
- Add user authentication and profiles.



