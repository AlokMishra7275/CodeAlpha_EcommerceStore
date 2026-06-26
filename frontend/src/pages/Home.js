import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home({ search }) {
const [products, setProducts] = useState([]);

useEffect(() => {
fetchProducts();
}, []);

const fetchProducts = async () => {
try {
const res = await axios.get("http://localhost:5000/api/products");
setProducts(res.data);
} catch (error) {
console.log("Error fetching products:", error);
}
};

const addToCart = async (productId) => {
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
if (!token || !userId) {
  alert("Please login first");
  return;
}

try {
  await axios.post(
    "http://localhost:5000/api/cart",
    {
      userId,
      productId,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Product added to cart 🛒");
} catch (error) {
  console.log("Add to cart error:", error);
  alert("Failed to add product");
}

};

const filteredProducts = products.filter((product) =>
product.name.toLowerCase().includes((search || "").toLowerCase())
);

return ( <div className="products-page"> <div className="hero"> <h1>🛍️ Welcome to My Store</h1> <p>Best Deals on Electronics & Gadgets</p> </div>

  <div className="products-grid">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div key={product._id} className="product-card">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/250x220?text=Product"
            }
            alt={product.name}
            className="product-image"
          />

          <h3 className="product-title">{product.name}</h3>

          <p className="price">₹{product.price}</p>

          <p>{product.description}</p>

          <button
            className="add-btn"
            onClick={() => addToCart(product._id)}
          >
            Add to Cart 🛒
          </button>
        </div>
      ))
    ) : (
      <h2>No products found</h2>
    )}
  </div>
</div>

);
}

export default Home;

