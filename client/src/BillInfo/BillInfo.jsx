import React, { useState } from 'react';
import './BillInfo.css'; 
import { FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const BillInformationForm = () => {
  const [items, setItems] = useState([
    { itemName: 'Item 1', quantity: 2, rate: 10, lineTotal: 20 },
    { itemName: 'Item 2', quantity: 1, rate: 15, lineTotal: 15 },
    // Add more example items here if needed
  ]);

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const navigate = useNavigate();

  const handleBack = (e) => {
    navigate("/side")
    e.preventDefault();
    console.log('Login clicked');
  };

  return (
    <div className="bill-information-form-container7">
      <h2>Bill Information</h2>

      <div className="item-details-section7">
        <h3>Item Details</h3>
        <div className="items-section">
          <table className="bill-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Line Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td><span>{item.itemName}</span></td>
                  <td><span>{item.quantity}</span></td>
                  <td><span>{item.rate}</span></td>
                  <td>{item.lineTotal}</td>
                  <td><FaTrash onClick={() => removeItem(index)} className="delete-item-icon" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="other-details-section7">
        <div className="form-group7">
          <label htmlFor="taxPercentage">Tax Percentage:</label>
          <input type="text" id="taxPercentage" />
        </div>


        <div className="form-group7">
          <label htmlFor="discount">Discount:</label>
          <input type="text" id="discount" />
        </div>
      </div>

      <div className="summary-section7">
        <div className="subtotal">Subtotal: $</div>
        <div className="tax">Tax: $</div>
        <div className="total">Total: $</div>
      </div>

      <div className="buttons-section7">
        <button className="cancel-button7" onClick={handleBack}>Cancel</button>
        <button className="save-print-button7">Save and Print Bill</button>
      </div>
    </div>
  );
};

export default BillInformationForm;
