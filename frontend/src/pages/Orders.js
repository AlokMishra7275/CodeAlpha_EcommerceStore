import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchOrders();
  }, []);

  // 📦 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `https://codealpha-ecommercestore-ypuy.onrender.com/api/orders/${userId}`
      );
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔒 if not logged in
  if (!userId) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Please login first 🔒</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found 😢</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>Order ID: {order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>

            <h4>Products:</h4>

            {order.products.map((p) => (
              <div key={p._id} style={{ marginLeft: "10px" }}>
                <p>Product: {p.productId.name}</p>
                <p>Quantity: {p.quantity}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;