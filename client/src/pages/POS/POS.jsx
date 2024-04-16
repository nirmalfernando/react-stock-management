import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./POS.css";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/products/product")
        setProducts(res.data)
      } catch (err) {
        setErr(err.response.data);
      }
    };
    fetchAllProducts()
  },[]);

  const navigate = useNavigate();

  const handleCart = (e) => {
    navigate("/bill");
    e.preventDefault();
    console.log("Cart clicked");
  };

  return (
    <div className="product-page">
      <div className="top-bar">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch />
        </div>
        <select className="filter-select">
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        <button className="cart-button" onClick={handleCart}>
          <AiOutlineShoppingCart />
        </button>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="card">
            <div className="card-header">{product.productname}</div>
            <div className="card-subtitle">{product.productname}</div>
            <img
              src={product.image}
              alt={product.productname}
              className="card-img"
            />
            <div className="card-details">
              <button className="add-to-cart-button">
                <span className="price">${product.sellingprice}</span>
                <span className="add-to-cart-icon">+</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
