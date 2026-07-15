import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem } from '../types';

interface CartWishlistContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (product: Product, size: string) => void;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chikanveda_cart');
    const savedWishlist = localStorage.getItem('chikanveda_wishlist');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist", e);
      }
    }
  }, []);

  // Save to localStorage whenever cart updates
  useEffect(() => {
    localStorage.setItem('chikanveda_cart', JSON.stringify(cart));
  }, [cart]);

  // Save to localStorage whenever wishlist updates
  useEffect(() => {
    localStorage.setItem('chikanveda_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize: size, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prevCart) => prevCart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    ));
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveToCart = (product: Product, size: string) => {
    addToCart(product, size, 1);
    removeFromWishlist(product.id);
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        moveToCart
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
