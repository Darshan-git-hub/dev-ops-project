import React from 'react';
import { useState, useEffect } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, game) => sum + game.price, 0);

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((game, index) => (
            <div key={index} className="cart-item">
              <h3>{game.title}</h3>
              <p>${game.price}</p>
              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h2>Total: ${total.toFixed(2)}</h2>
            <button>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
