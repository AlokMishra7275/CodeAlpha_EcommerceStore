const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const router = express.Router();

/* ================= PLACE ORDER ================= */
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    // Get cart items
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalAmount = 0;

    const products = cartItems.map((item) => {
      totalAmount += item.productId.price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
      };
    });

    // Create order
    const order = new Order({
      userId,
      products,
      totalAmount,
    });

    await order.save();

    // Clear cart after order
    await Cart.deleteMany({ userId });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ================= GET USER ORDERS ================= */
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("products.productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;