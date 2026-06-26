require("dotenv").config();

const express = require("express");
const cors = require("cors");

// DB connection
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Auth routes (register/login)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Product routes
const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);

// Cart routes  👇 ADD THESE 2 LINES
const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);

//order routes
const orderRoutes = require("./routes/order");
app.use("/api/orders", orderRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("CodeAlpha E-commerce API Running 🚀");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});