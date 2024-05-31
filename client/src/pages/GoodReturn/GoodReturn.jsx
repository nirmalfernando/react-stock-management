import React, { useEffect, useState } from "react";
import "./GoodReturn.css";
import axios from "axios";

const GoodReturn = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const [inputs, setInputs] = useState({
    product: "",
    sku: "",
    unitprice: null,
    qty: null,
    total: null,
    billid: "",
    date: currentDate,
    discount: null,
    tax: null,
  });

  const [err, setErr] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

    if (name === "billid" && value) {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/salesorders/order/${value}`
        );
        console.log("Response Data: ", res.data);
        setOrders(res.data || []); // Initialize orders with retrieved data or empty array
      } catch (err) {
        setErr(err.response.data);
      }
    }
  };

  useEffect(() => {
    console.log("Orders State:", orders);
  }, [orders]); // Log orders state whenever it changes

  const handleAddOrder = () => {
    const { sku, product, unitprice, qty, total } = inputs;
    if (sku && product && unitprice && qty && total) {
      setOrders([...orders, inputs]); // Add the current inputs as a new order
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

  const handleRemoveOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8800/api/goodreturns/goodreturn", {
        ...inputs,
        orders: orders,
      });

      // Clear inputs and orders only after successful response from the server
      setInputs({
        product: "",
        sku: "",
        unitprice: null,
        qty: null,
        total: null,
        billid: "",
        date: "",
        discount: null,
        tax: null,
      });
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
              <label htmlFor="billid">Bill ID</label>
              <input
                type="text"
                id="billid"
                name="billid"
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className="orders" key={index}>
                <td>{order.sku}</td>
                <td>{order.product}</td>
                <td className="numeric">{order.qty}</td>
                <td className="numeric">{order.unitprice}</td>
                <td className="numeric">{order.total}</td>
                <td>
                  <button onClick={() => handleRemoveOrder(index)}>
                    Remove
                  </button>
                </td>
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
              <input type="text" id="tax" name="tax" onChange={handleChange} />
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
          <button className="save-button11" onClick={handleSave}>
            Save
          </button>
          {err && <div className="error">{err}</div>}
        </div>
      </div>
    </div>
  );
};

export default GoodReturn;
