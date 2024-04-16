import React, { useState } from 'react';
import './GoodReturn.css';
import { BsSearch } from "react-icons/bs";
const GoodReturn = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (

    <div className="good-return">
      <div className="content-box22">
        <div className="dropdown-container22">
          <select className="dropdown22">
            <option value="option1">Last 7 Days</option>
            <option value="option2">Last 30 Days</option>
            <option value="option3">Last 6 Months</option>
          </select>
        </div>
        <h2>Good Return Note</h2>
        <div className="form-container22">
          <div className="form-column22">
            <div className="form-group22">
              <label htmlFor="grnNo">Return No</label>
              <input type="text" id="rID" name="rID" />
            </div>
            <div className="form-group22">
              <label htmlFor="invoiceId">Invoice ID</label>
              <input type="text" id="invoiceId" name="invoiceId" />
            </div>
          </div>
          <div className="form-column22">
            <div className="form-group22">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" />
            </div>
          </div>
        </div>
        <table className="product-table22">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>QTY</th>
              <th>Price</th>
              <th>Selling Price</th>
              <th>Tax</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>

          </thead>
          <tbody>
            <tr className="search-row22">
              <th><input type="text"  placeholder="Search ID" className="search-input22" /></th>
              
              <th><input type="text" placeholder="Search Name" className="search-input22" /></th>
              <th colSpan="6"></th>
            </tr>
            <tr>
              <td>000001</td>
              <td>iphone14</td>
              <td className="numeric">10</td>
              <td className="numeric">200,000</td>
              <td className="numeric">210,000</td>
              <td className="numeric">10</td>
              <td className="numeric">10</td>
              <td className="numeric">200,00</td>
            </tr>
            <tr>
              <td>000001</td>
              <td>iphone14</td>
              <td className="numeric">10</td>
              <td className="numeric">200,000</td>
              <td className="numeric">210,000</td>
              <td className="numeric">10</td>
              <td className="numeric">10</td>
              <td className="numeric">200,00</td>
            </tr>
            <tr>
              <td>000001</td>
              <td>iphone14</td>
              <td className="numeric">10</td>
              <td className="numeric">200,000</td>
              <td className="numeric">210,000</td>
              <td className="numeric">10</td>
              <td className="numeric">10</td>
              <td className="numeric">200,00</td>
            </tr>
          </tbody>
        </table>
        <div className="bottom-section22">
          <div className="calculation-fields22">
            <div className="form-group22">
              <label htmlFor="discount">Discount</label>
              <input type="text" id="discount" name="discount" />
            </div>
            <div className="form-group22">
              <label htmlFor="tax">Tax</label>
              <input type="text" id="tax" name="tax" />
            </div>
          </div>
          <div className="summary-section22">
            <div className="summary-item22"><strong>Subtotal</strong> $600.00</div>
            <div className="summary-item22"><strong>Tax (0%)</strong> $0.00</div>
            <div className="summary-item22"><strong>Discount (0%)</strong> $0.00</div>
            <div className="summary-item22"><strong>Total</strong> $600.00</div>
          </div>
        </div>
        <div className="buttons-container22">
          <button className="close-button22">Close</button>
          <button className="add-button22" onClick={toggleModal}>ADD</button>
          <button className="save-button22">Save</button>
        </div>
        {isModalOpen && (
          <div className="modal22">
            <div className="modal-content22">
              <h2>Enter New Product Details</h2>
              <input type="text" placeholder="ID" />
              <input type="text" placeholder="Product Name" />
              <input type="number" placeholder="QTY" />
              <input type="text" placeholder="Price" />
              <input type="text" placeholder="Selling Price" />
              <input type="text" placeholder="Tax" />
              <input type="text" placeholder="Discount" />
              <div className="modal-buttons22">
                <button className="add-row-button22" style={{ backgroundColor: "#d84339" }} onClick={toggleModal}>Add</button>
                <button className="cancel-button22" style={{ backgroundColor: "#f2f4f0" }} onClick={toggleModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoodReturn;
