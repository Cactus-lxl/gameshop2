import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { CartContextType, CartItem, Game } from "@/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  useEffect(() => {
    const inCart = localStorage.getItem("cart");
    if (inCart) {
      try {
        const parsedCart = JSON.parse(inCart);
        setCartItem(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (game: Game): void => {
    // Generate a random price since the API doesn't provide one
    const withPrice: CartItem = { 
      ...game, 
      price: Math.floor(Math.random() * (70 - 10 + 1)) + 10 
    };

    setCartItem(prev => {
      if (prev.some(item => item.id === game.id)) return prev;
      return [...prev, withPrice];
    });
  };

  const removeFromCart = (gameID: number): void => {
    setCartItem(prev => prev.filter(game => game.id !== gameID));
  };

  const getTotalPrice = (): number => {
    return cartItem.reduce((sum, item) => sum + (item.price || 0), 0);
  };

  const value: CartContextType = {
    cartItem,
    addToCart,
    removeFromCart,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};