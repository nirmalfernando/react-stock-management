import React, { useState } from "react";
import "./Products.css";
import { FaTrash, FaImage } from "react-icons/fa";
import axios from "axios";

const Products = () => {
  const [inputs, setInputs] = useState({
    productname: "",
    category: "",
    categoryid: null,
    brand: "",
    variant: "",
    sku: "",
    purchaseprice: null,
    sellingprice: null,
    image: "",
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/products/product", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="fullpage">
    <div className="registration-form-container">
      <h2 className="pageName">Products</h2>
      <form>
        <div className="column">
          <div className="form-group1">
            <label htmlFor="name" className="tnputInstructions">Product Name:</label>
            <input
              type="text"
              id="productname"
              name="productname"
              placeholder="Product Name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="productId" className="tnputInstructions">Category ID:</label>
            <input
              type="text"
              id="categoryid"
              name="categoryid"
              placeholder="Category ID"
              onChange={handleChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="capitalPrice" className="tnputInstructions">Purchasing Price (LKR):</label>
            <input
              type="text"
              id="purchaseprice"
              name="purchaseprice"
              placeholder="Purchasing Price"
              onChange={handleChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="sellingPrice" className="tnputInstructions">Selling Price (LKR):</label>
            <input
              type="text"
              id="sellingprice"
              name="sellingprice"
              placeholder="Selling Price"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="column">
          <div className="form-group1">
            <label htmlFor="category" className="tnputInstructions">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Category"
              onChange={handleChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="brand" className="tnputInstructions">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              placeholder="Brand"
              onChange={handleChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="variant" className="tnputInstructions">Type/Colour:</label>
            <input
              type="text"
              id="variant"
              name="variant"
              placeholder="Type/Colour"
              onChange={handleChange}
            />
          </div>
          <div className="form-group1">
            <label htmlFor="sku" className="tnputInstructions">SKU (Barcode):</label>
            <input
              type="text"
              id="sku"
              name="sku"
              placeholder="SKU"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="photo-upload">
          <label htmlFor="photo" className="tnputInstructions">Choose Photo:</label>
          <div className="photo-upload-input">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <label htmlFor="photo" className="file-label" >
              <FaImage /> <span className="tnputInstructions">Choose File</span>
            </label>
          </div>
        </div>
        {err && err}
        <div className="delete-button">
          <FaTrash />
        </div>
        <button type="submit" className="submit-button" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Products;
