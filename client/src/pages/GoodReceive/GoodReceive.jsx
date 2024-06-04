import React, { useState, useEffect } from "react";
import "./GoodReceive.css";
import axios from "axios";

const GoodReceive = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [inputs, setInputs] = useState({
    product: "",
    sku: "",
    unitprice: null,
    qty: null,
    total: null,
    grnno: "",
    invoiceid: "",
    date: currentDate,
    discount: null,
    tax: null,
  });

  const [err, setErr] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let newInputs = { ...inputs, [name]: value };

    if (name === "unitprice" || name === "qty") {
      const unitPrice = parseFloat(newInputs.unitprice) || 0;
      const qty = parseFloat(newInputs.qty) || 0;
      const total = (unitPrice * qty).toFixed(2);
      newInputs.total = total;
    }

    if (name === "sku" && value) {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/products/product/${value}`
        );
        const product = res.data[0];
        newInputs.product = product.productname;
        newInputs.unitprice = product.purchaseprice;
      } catch (err) {
        setErr(err.response.data);
      }
    }

    setInputs(newInputs);
  };

  const handleAddOrder = () => {
    const { sku, product, unitprice, qty, total } = inputs;
    if (sku && product && unitprice && qty && total) {
      setOrders([...orders, inputs]);
      setInputs({
        ...inputs,
        sku: "",
        product: "",
        unitprice: null,
        qty: null,
        total: null,
      });
    } else {
      setErr("Please fill all order details");
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8800/api/goodreceives/goodreceive", {
        ...inputs,
        orders: orders,
      });
      // Clear orders after saving
      setOrders([]);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const calculateSubTotal = () => {
    let subtotal = 0;
    for (const order of orders) {
      subtotal += parseFloat(order.total);
    }
    return subtotal.toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubTotal());
    const discount = parseFloat(inputs.discount) || 0;
    const tax = parseFloat(inputs.tax) || 0;
    const discountAmount = subtotal * (discount / 100);
    const taxAmount = subtotal * (tax / 100);
    const total = subtotal - discountAmount + taxAmount;
    return total.toFixed(2);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="good-receive">
      <div className="content-box11">
        <div className="dropdown-container">
          <select className="dropdown">
            <option value="option1">Last 7 Days</option>
            <option value="option2">Last 30 Days</option>
            <option value="option3">Last 6 Months</option>
          </select>
        </div>
        <h2>Good Received Note</h2>
        <div className="form-container11">
          <div className="form-column11">
            <div className="form-group11">
              <label htmlFor="grnNo">GRN No</label>
              <input
                type="text"
                id="grnno"
                name="grnno"
                onChange={handleChange}
              />
            </div>
            <div className="form-group11">
              <label htmlFor="invoiceId">Invoice ID</label>
              <input
                type="text"
                id="invoiceid"
                name="invoiceid"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-column11">
            <div className="form-group11">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <table className="product-table11">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="search-row11">
              <th>
                <input
                  type="text"
                  placeholder="Search SKU"
                  className="search-input11"
                />
              </th>
              <th>
                <input
                  type="text"
                  placeholder="Search Name"
                  className="search-input11"
                />
              </th>
              <th colSpan="6"></th>
            </tr>
            {orders.map((order, index) => (
              <tr className="orders" key={index}>
                <td>{order.sku}</td>
                <td>{order.product}</td>
                <td className="numeric">{order.unitprice}</td>
                <td className="numeric">{order.qty}</td>
                <td className="numeric">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bottom-section11">
          <div className="calculation-fields11">
            <div className="form-group11">
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                id="discount"
                name="discount"
                onChange={handleChange}
              />
            </div>
            <div className="form-group11">
              <label htmlFor="tax">Tax</label>
              <input
                type="text"
                id="tax"
                name="tax"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="summary-section11">
            <div className="summary-item11">
              <strong>Subtotal</strong> LKR {calculateSubTotal()}
            </div>
            <div className="summary-item11">
              <strong>Tax ({inputs.tax || 0}%)</strong> LKR{" "}
              {(
                parseFloat(calculateSubTotal()) *
                (parseFloat(inputs.tax) / 100 || 0)
              ).toFixed(2)}
            </div>
            <div className="summary-item11">
              <strong>Discount ({inputs.discount || 0}%)</strong> LKR{" "}
              {(
                parseFloat(calculateSubTotal()) *
                (parseFloat(inputs.discount) / 100 || 0)
              ).toFixed(2)}
            </div>
            <div className="summary-item11">
              <strong>Total</strong> LKR {calculateTotal()}
            </div>
          </div>
        </div>
        <div className="buttons-container11">
          <button className="close-button11">Close</button>
          <button className="add-button11" onClick={toggleModal}>
            ADD
          </button>
          <button className="save-button11" onClick={handleSave}>
            Save
          </button>
          {err && <div className="error">{err}</div>}
        </div>
        {isModalOpen && (
          <div className="modal11">
            <div className="modal-content11">
              <h2>Enter New Purchasing Order Details</h2>
              <input
                type="text"
                placeholder="SKU"
                id="sku"
                name="sku"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Product Name"
                id="product"
                name="product"
                value={inputs.product}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Unit Price"
                id="unitprice"
                name="unitprice"
                value={inputs.unitprice}
                onChange={handleChange}
              />
              <input
                type="number"
                placeholder="QTY"
                id="qty"
                name="qty"
                value={inputs.qty}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Total Price"
                id="total"
                name="total"
                value={inputs.total}
                onChange={handleChange}
              />
              {err && <div className="error">{err}</div>}
              <div className="modal-buttons11">
                <button
                  className="add-row-button11"
                  style={{ backgroundColor: "#d84339" }}
                  onClick={handleAddOrder}
                >
                  Add
                </button>
                <button
                  className="cancel-button11"
                  style={{ backgroundColor: "#f2f4f0" }}
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoodReceive;