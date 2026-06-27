import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");

  // 📦 Fetch Cart Items
  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://codealpha-ecommercestore-ypuy.onrender.com/api/cart?userId=${userId}`
      );

      setCartItems(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [fetchCart, userId]);

  // 💰 Calculate Total
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  // 💳 Place Order
  const placeOrder = async () => {
    try {
      const res = await axios.post(
        "https://codealpha-ecommercestore-ypuy.onrender.com/api/orders",
        {
          userId,
        }
      );

      alert("Order placed successfully 🎉");
      console.log(res.data);

      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Order failed ❌");
    }
  };

  // 🗑️ Remove Item
  const removeItem = async (cartId) => {
    try {
      await axios.delete(
        `https://codealpha-ecommercestore-ypuy.onrender.com/api/cart/${cartId}`
      );

      alert("Item removed successfully 🗑️");

      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Failed to remove item");
    }
  };

  // 🔒 Not Logged In
  if (!userId) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Please login first 🔒</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.productId.name}</h3>

              <p>
                <strong>Price:</strong> ₹{item.productId.price}
              </p>

              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <p>
                <strong>Subtotal:</strong> ₹
                {item.productId.price * item.quantity}
              </p>

              <button
                onClick={() => removeItem(item._id)}
                className="remove-btn"
              >
                Remove ❌
              </button>
            </div>
          ))}

          <hr />

          <h2 className="cart-total">💰 Total: ₹{getTotal()}</h2>

          <button
            onClick={placeOrder}
            style={{
              padding: "10px 15px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Place Order 💳
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;