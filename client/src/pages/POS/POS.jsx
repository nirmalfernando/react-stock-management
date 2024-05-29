import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./POS.css";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/products/product");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchAllProducts();
  }, []);

  const handleCart = () => {
    navigate("/bill", { state: { cartItems } });
  };

  const handleAddToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
  };

  return (
    <div className="product-page">
      <div className="top-bar">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="searchBar"/>
          <AiOutlineSearch className="searchicon"/>
        </div>
        <select className="filter-select">
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        <button className="cart-button" onClick={handleCart}>
          <AiOutlineShoppingCart /> {cartItems.length}
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
              <button
                className="add-to-cart-button"
                onClick={() =>
                  handleAddToCart({
                    sku: product.sku,
                    productname: product.productname,
                    unitprice: product.sellingprice, // Use sellingprice here
                    qty: 1, // Default quantity is 1
                    sellingprice: product.sellingprice // Use sellingprice here as well
                  })
                }
              >
                <span className="price">LKR {product.sellingprice}</span>
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
