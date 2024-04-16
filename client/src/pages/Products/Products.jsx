import React, { useState } from 'react';
import './Products.css'; 
import { FaTrash, FaImage } from 'react-icons/fa'; 



const Products = () => {
  
  return (
    <div className="registration-form-container">
      <h2>Products</h2>
      <form>
        <div className="column">
          <div className="form-group1">
            <label htmlFor="name">Item Name:</label>
            <input type="text" id="name" placeholder='Item Name' />
          </div>
          <div className="form-group1">
            <label htmlFor="productId">Product ID:</label>
            <input type="text" id="productId" placeholder='Product ID' />
          </div>
          <div className="form-group1">
            <label htmlFor="capitalPrice">Purchasing Price:</label>
            <input type="text" id="capitalPrice" placeholder='Purchasing Price' />
          </div>
          <div className="form-group1">
            <label htmlFor="sellingPrice">Selling Price:</label>
            <input type="text" id="sellingPrice" placeholder='Selling Price' />
          </div>
        </div>
        <div className="column">
          <div className="form-group1">
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" placeholder='Category' />
          </div>
          <div className="form-group1">
            <label htmlFor="supplier">Brand:</label>
            <input type="text" id="supplier" placeholder='Brand' />
          </div>
          <div className="form-group1">
            <label htmlFor="brand">Type/Colour:</label>
            <input type="text" id="brand" placeholder='Type/Colour' />
          </div>
          <div className="form-group1">
            <label htmlFor="sku">SKU (Barcode):</label>
            <input type="text" id="sku" placeholder='SKU' />
          </div>
        </div>
        <div className="photo-upload">
          <label htmlFor="photo">Choose Photo:</label>
          <div className="photo-upload-input">
            <input type="file" id="photo" accept="image/*" />
            <label htmlFor="photo" className="file-label"><FaImage /> Choose File</label>
          </div>
        </div>
        <div className="delete-button">
          <FaTrash />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Products;
