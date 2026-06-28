const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    // Pricing
    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
      default: 0,
    },

    // Description
    description: {
      type: String,
      default: "",
    },

    // Product Image
    image: {
      type: String,
      default: "",
    },

    // Inventory
    stock: {
      type: Number,
      default: 0,
    },

    // Ratings
    rating: {
      type: Number,
      default: 4.5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    // Specifications
    storage: {
      type: String,
      default: "",
    },

    ram: {
      type: String,
      default: "",
    },

    display: {
      type: String,
      default: "",
    },

    processor: {
      type: String,
      default: "",
    },

    battery: {
      type: String,
      default: "",
    },

    rearCamera: {
      type: String,
      default: "",
    },

    frontCamera: {
      type: String,
      default: "",
    },

    // Warranty & Delivery
    warranty: {
      type: String,
      default: "1 Year Manufacturer Warranty",
    },

    delivery: {
      type: String,
      default: "Free Delivery in 2-4 Days",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);