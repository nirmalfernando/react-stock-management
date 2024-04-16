import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Card from './Card/Card'; 
import './POS.css'; 
import { useNavigate } from 'react-router-dom';


const ProductPage = () => {

  const navigate = useNavigate();

  const handleCart = (e) => {
    navigate("/bill")
    e.preventDefault();
    
    console.log('Login clicked');
  };
  
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      imageUrl: 'https://via.placeholder.com/300x200', 
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      imageUrl: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 20,
      imageUrl: 'https://via.placeholder.com/300x200', 
    },
  ];

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
        <button className="cart-button"onClick={handleCart}><AiOutlineShoppingCart /></button>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
