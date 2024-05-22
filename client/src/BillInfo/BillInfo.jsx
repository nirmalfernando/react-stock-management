import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; 
import "./BillInfo.css";

const BillInformationForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    tax: "",
    discount: "",
  });
  const [amountPaid, setAmountPaid] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const formattedDate = new Date().toISOString().split("T")[0];

  const saveOrder = async () => {
    try {
      const orderDetails = cartItems.map((item) => ({
        sku: item.sku,
        product: item.productname,
        qty: item.qty,
        unitprice: item.sellingprice,
        total: item.qty * item.sellingprice,
      }));

      // Format the date to "YYYY-MM-DD" format
      const formattedDate = new Date().toISOString().split("T")[0];

      // Log the payload (request) before sending
      console.log("Sending payload:", {
        date: formattedDate,
        tax: parseFloat(inputs.tax) || 0,
        discount: parseFloat(inputs.discount) || 0,
        total: calculateTotal(),
        amountPaid: parseFloat(amountPaid) || 0,
        balance: calculateTotal() - (parseFloat(amountPaid) || 0),
        items: orderDetails,
      });

      await axios.post("http://localhost:8800/api/salesorders/order", {
        date: formattedDate,
        tax: parseFloat(inputs.tax) || 0,
        discount: parseFloat(inputs.discount) || 0,
        total: calculateTotal(),
        amountPaid: parseFloat(amountPaid) || 0,
        balance: calculateTotal() - (parseFloat(amountPaid) || 0),
        items: orderDetails,
      });

      // Reset cartItems after successful order submission
      setCartItems([]);
      setError(null);
    } catch (error) {
      setError("Error saving order. Please try again later.");
      console.error("Error saving order:", error);
    }
  };

  const calculateSubTotal = () => {
    let subtotal = 0;
    for (const item of cartItems) {
      subtotal += item.qty * item.sellingprice;
    }
    return subtotal;
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

  const handleBack = () => {
    // Handle going back to the previous page
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
  
    doc.text("Bill Information", 14, 20);
    doc.text(`Date: ${formattedDate}`, 14, 30);
  
    doc.autoTable({
      startY: 40,
      head: [['SKU', 'Item Name', 'Quantity', 'Price', 'Total']],
      body: cartItems.map(item => [
        item.sku, 
        item.productname, 
        item.qty, 
        item.sellingprice.toFixed(2), 
        (item.qty * item.sellingprice).toFixed(2)
      ]),
    });
  
    const finalY = doc.lastAutoTable.finalY + 10;
  
    doc.text(`Subtotal: LKR ${calculateSubTotal().toFixed(2)}`, 14, finalY);
    doc.text(`Tax (${inputs.tax}%): LKR ${(calculateSubTotal() * (inputs.tax / 100)).toFixed(2)}`, 14, finalY + 10);
    doc.text(`Discount (${inputs.discount}%): LKR ${(calculateSubTotal() * (inputs.discount / 100)).toFixed(2)}`, 14, finalY + 20);
    doc.text(`Total: LKR ${calculateTotal()}`, 14, finalY + 30);
    doc.text(`Amount Paid: LKR ${parseFloat(amountPaid).toFixed(2)}`, 14, finalY + 40);
    doc.text(`Balance: LKR ${(calculateTotal() - parseFloat(amountPaid)).toFixed(2)}`, 14, finalY + 50);
  
    // Create a Blob from the PDF and open it in a new tab
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  };
  

  const handlePrint = () => {
    generatePDF();
  };

  const handleAmountPaidChange = (e) => {
    setAmountPaid(e.target.value);
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
                <th>SKU</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span>{item.sku}</span>
                  </td>
                  <td>
                    <span>{item.productname}</span>
                  </td>
                  <td>
                    <span>{item.qty}</span>
                  </td>
                  <td>
                    <span>{item.sellingprice}</span>
                  </td>
                  <td>{item.qty * item.sellingprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="summary-section7">
        <div className="subtotal">
          <strong>Subtotal: </strong> LKR {calculateSubTotal()}
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
        <div className="total">
          <strong>Total: </strong> LKR {calculateTotal()}
        </div>
        <div className="amount-paid">
          <label htmlFor="amountPaid">
            <strong1>AmountPaid:</strong1>
          </label>
          <input
            type="text"
            id="amountPaid"
            className="amount-paid-input"
            value={amountPaid}
            onChange={handleAmountPaidChange}
          />
        </div>
        <div className="balance">
          <strong>Balance: </strong> LKR {calculateTotal() - amountPaid}
        </div>
      </div>

      <div className="other-details-section7">
        <div className="form-group7">
          <label htmlFor="taxPercentage">Tax Percentage:</label>
          <input
            type="text"
            id="taxPercentage"
            name="tax"
            onChange={handleChange}
          />
        </div>

        <div className="form-group7">
          <label htmlFor="discount">Discount:</label>
          <input
            type="text"
            id="discount"
            name="discount"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="buttons-section7">
        <button className="cancel-button7" onClick={handleBack}>
          Cancel
        </button>
        <button className="save-print-button7" onClick={saveOrder}>
          Save
        </button>
        <button className="print-button" onClick={handlePrint}>
          Print Bill
        </button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default BillInformationForm;
