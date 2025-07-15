import './App.css'
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import NewAcc from "./pages/NewAcc";
import DetailsPage from "./pages/DetailsPage";
import CheckOutPage from "./pages/CheckOutPage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./service/ProtectedRoute";
import { CartProvider } from "./context/CartContext";

// Main App component
function App(): JSX.Element {
  const [isValid, setIsValid] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  return (
    <CartProvider>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Login setIsValid={setIsValid} />} />
          <Route 
            path="/home"
            element={<HomePage />} 
          />
          <Route 
            path="/cart"
            element={
              <ProtectedRoute isLoggedIn={isValid}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/newacc" element={<NewAcc />} />
          <Route 
            path="/details"
            element={
              <ProtectedRoute isLoggedIn={isValid}>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/checkoutpage"
            element={
              <ProtectedRoute isLoggedIn={isValid}>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;