const express = require("express");
const Cart = require("../models/cart");

const router = express.Router();

/* ADD TO CART */
router.post("/", async (req, res) => {
  try {
    const cartItem = new Cart(req.body);

    await cartItem.save();

    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* GET CART ITEMS */
router.get("/", async (req, res) => {
try {
const { userId } = req.query;

const items = await Cart.find({ userId })
  .populate("productId")
  .populate("userId");

res.json(items);

} catch (error) {
res.status(500).json({
message: error.message,
});
}
});

/* REMOVE CART ITEM */
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;