import React from 'react';
import './Card.css'; 

const Card = ({ product }) => {
  return (
    <div className="card">
      <div className="card-header">iPhone 14</div>
      <div className="card-subtitle">{product.name}</div>
      <img src={product.imageUrl} alt={product.name} className="card-img" />
      <div className="card-details">
        <button className="add-to-cart-button">
          <span className="price">${product.price}</span>
          <span className="add-to-cart-icon">+</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
