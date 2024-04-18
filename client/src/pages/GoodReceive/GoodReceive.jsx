import React, { useEffect, useState } from "react";
import "./GoodReceive.css";
import axios from "axios";
const GoodReceive = () => {
  const [inputs, setInputs] = useState({
    product: "",
    sku: "",
    unitprice: null,
    qty: null,
    total: null,
  });

  const [err, setErr] = useState(null);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let newInputs = { ...inputs, [name]: value };

    if (name === "unitprice" || name === "qty") {
      // Calculate total if either unit price or quantity changes
      const unitPrice = parseFloat(newInputs.unitprice);
      const qty = parseFloat(newInputs.qty);
      newInputs.total = (unitPrice * qty).toFixed(2);
    }

    // Fetch product details based on SKU
    if (name === "sku" && value) {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/products/product/${value}`
        );
        const product = res.data[0];
        console.log(res.data);
        newInputs.product = product.productname;
        newInputs.unitprice = product.purchaseprice;
      } catch (err) {
        setErr(err.response.data);
      }
    }
    console.log(newInputs);
    setInputs(newInputs);
  };

  const handleClick = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await axios.post("http://localhost:8800/api/purchases/purchase", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/purchases/purchase"
        );
        setOrders(res.data);
      } catch (err) {
        setErr(err.response.data);
      }
    };
    fetchAllOrders();
  }, []);

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
              <input type="text" id="grnNo" name="grnNo" />
            </div>
            <div className="form-group11">
              <label htmlFor="invoiceId">Invoice ID</label>
              <input type="text" id="invoiceId" name="invoiceId" />
            </div>
          </div>
          <div className="form-column11">
            <div className="form-group11">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" />
            </div>
          </div>
        </div>
        <table className="product-table11">
          <thead>
            <tr>
              <th>SKU</th>
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
            <div>
              {orders.map((order) => (
                <tr className="orders">
                  <td>{order.sku}</td>
                  <td>{order.product}</td>
                  <td className="numeric">{order.unitprice}</td>
                  <td className="numeric">{order.qty}</td>
                  <td className="numeric">{order.total}</td>
                </tr>
              ))}
            </div>
          </tbody>
        </table>
        <div className="bottom-section11">
          <div className="calculation-fields11">
            <div className="form-group11">
              <label htmlFor="discount">Discount</label>
              <input type="text" id="discount" name="discount" />
            </div>
            <div className="form-group11">
              <label1 htmlFor="tax">Tax</label1>
              <input type="text" id="tax" name="tax" />
            </div>
          </div>
          <div className="summary-section11">
            <div className="summary-item11">
              <strong>Subtotal</strong> $600.00
            </div>
            <div className="summary-item11">
              <strong>Tax (0%)</strong> $0.00
            </div>
            <div className="summary-item11">
              <strong>Discount (0%)</strong> $0.00
            </div>
            <div className="summary-item11">
              <strong>Total</strong> $600.00
            </div>
          </div>
        </div>
        <div className="buttons-container11">
          <button className="close-button11">Close</button>
          <button className="add-button11" onClick={toggleModal}>
            ADD
          </button>
          <button className="save-button11">Save</button>
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
              {err && err}
              <div className="modal-buttons11">
                <button
                  className="add-row-button11"
                  style={{ backgroundColor: "#d84339" }}
                  onClick={(event) => {
                    toggleModal();
                    handleClick(event);
                  }}
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
