import React from 'react';
import './Inventory.css';
import productImage from '../../assets/phone.png';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const InventoryPage = () => {

  const navigate = useNavigate();

  const handleReservation = (e) => {
    navigate("/reservation")
    e.preventDefault();
    
    console.log('Login clicked');
  };
  const handleReturn = (e) => {
    navigate("/return")
    e.preventDefault();
    
    console.log('Login clicked');
  };
  return (
    <div className="full-screen">
      <div className="inventory-page">
        <div className="cardd">
          <div className="search-filter">
            <input type="text" placeholder="Search..." />
            <select>
              <option value="">Filter by Days</option>
              <option value="1">Last 1 day</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
          <table className="inventorytable">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to="/inventory" className="phone-link">
                    <img src={productImage} alt="Product" style={{ width: '60px' }} />
                  </Link>
                  <span>Product 1</span>
                </td>
                <td>10</td>
                <td>100</td>
              </tr>
              {/* Additional rows */}
            </tbody>
          </table>
        </div>
        <div className="note-buttons">
          <button onClick={handleReservation}>Good Reservation Note</button>
          <button onClick={handleReturn}>Good Return Note</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
