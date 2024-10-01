import React, { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { token } = useContext(UserContext); 

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    setTotal(total + item.price);
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find(cartItem => cartItem.id === id);
    if (itemToRemove.quantity > 1) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      ));
      setTotal(total - itemToRemove.price);
    } else {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== id));
      setTotal(total - itemToRemove.price);
    }
  };

  // Método para enviar el carrito al backend
  const sendCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          cart: cartItems,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el carrito');
      }

      // Procesar la respuesta exitosa
      const result = await response.json();
      console.log("Carrito enviado exitosamente:", result);
      alert("Carrito enviado con éxito.");

      // vaciar el carrito después de la compra
      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error("Hubo un problema al enviar el carrito:", error);
      alert("Hubo un problema al enviar el carrito.");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, total, sendCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

