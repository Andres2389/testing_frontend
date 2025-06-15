// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1) Inicializamos el estado leyendo localStorage con useState lazy
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("costehuilense_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 2) Cada vez que items cambie, lo persistimos
  useEffect(() => {
    localStorage.setItem("costehuilense_cart", JSON.stringify(items));
  }, [items]);

  // 3) Funciones de mutación
  const addItem = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i._id === product._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].cantidad += 1;
        return copy;
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeItem = (productId) =>
    setItems((prev) => prev.filter((i) => i._id !== productId));

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.cantidad * i.valor, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
