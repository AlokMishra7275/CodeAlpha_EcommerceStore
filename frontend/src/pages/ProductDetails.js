import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://codealpha-ecommercestore-ypuy.onrender.com/api/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "https://codealpha-ecommercestore-ypuy.onrender.com/api/cart",
        {
          userId,
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added to Cart 🛒");
    } catch (error) {
      console.log(error);
      alert("Failed to add product");
    }
  };

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontSize: "25px",
        }}
      >
        Loading Product...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          display: "flex",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}

        <div style={{ flex: "1", minWidth: "350px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "contain",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* RIGHT */}

        <div style={{ flex: "1.2", minWidth: "350px" }}>
          <h1>{product.name}</h1>

          <h3 style={{ color: "#555" }}>
            Brand : {product.brand || "N/A"}
          </h3>

          <p
            style={{
              color: "#008000",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            ⭐ {product.rating || 4.5} ({product.reviews || 0} Reviews)
          </p>

          <h2 style={{ color: "green" }}>
            ₹{product.price}
          </h2>

          {product.originalPrice > 0 && (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "gray",
                  marginRight: "15px",
                }}
              >
                ₹{product.originalPrice}
              </span>

              <span style={{ color: "red" }}>
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </span>
            </>
          )}

          <hr />

          <h3>Product Details</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td><b>Category</b></td>
                <td>{product.category || "-"}</td>
              </tr>

              <tr>
                <td><b>Color</b></td>
                <td>{product.color || "-"}</td>
              </tr>

              <tr>
                <td><b>RAM</b></td>
                <td>{product.ram || "-"}</td>
              </tr>

              <tr>
                <td><b>Storage</b></td>
                <td>{product.storage || "-"}</td>
              </tr>

              <tr>
                <td><b>Display</b></td>
                <td>{product.display || "-"}</td>
              </tr>

              <tr>
                <td><b>Processor</b></td>
                <td>{product.processor || "-"}</td>
              </tr>

              <tr>
                <td><b>Battery</b></td>
                <td>{product.battery || "-"}</td>
              </tr>

              <tr>
                <td><b>Rear Camera</b></td>
                <td>{product.rearCamera || "-"}</td>
              </tr>

              <tr>
                <td><b>Front Camera</b></td>
                <td>{product.frontCamera || "-"}</td>
              </tr>

              <tr>
                <td><b>Warranty</b></td>
                <td>{product.warranty}</td>
              </tr>

              <tr>
                <td><b>Delivery</b></td>
                <td>{product.delivery}</td>
              </tr>

              <tr>
                <td><b>Stock</b></td>
                <td>
                  {product.stock > 0 ? (
                    <span style={{ color: "green" }}>
                      {product.stock} Available
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      Out of Stock
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h3>Description</h3>

          <p
            style={{
              color: "#444",
              lineHeight: "28px",
            }}
          >
            {product.description}
          </p>

          <br />

          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <button
              onClick={addToCart}
              style={{
                padding: "15px 30px",
                background: "#ff9900",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "17px",
              }}
            >
              Add to Cart 🛒
            </button>

            <button
              style={{
                padding: "15px 30px",
                background: "#fb641b",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "17px",
              }}
            >
              Buy Now ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;