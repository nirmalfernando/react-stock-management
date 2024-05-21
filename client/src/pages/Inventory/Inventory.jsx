import React, { useEffect, useState } from "react";
import "./Inventory.css";
import productImage from "../../assets/phone.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch products
        const productsRes = await axios.get(
          "http://localhost:8800/api/products/product"
        );
        const productsData = productsRes.data;

        // Fetch and process good receive quantity data
        const getGoodReceiveQty = async (sku) => {
          try {
            const res = await axios.get(
              `http://localhost:8800/api/goodreceives/receive/qty/${sku}`
            );
            const qtyData = res.data;
            const latestQty =
              qtyData.length > 0 ? qtyData[qtyData.length - 1].qty : 0;
            return latestQty;
          } catch (err) {
            console.error("Error fetching good receive quantity", err);
            return 0;
          }
        };

        // Fetch and process sales order quantity data
        const getSalesOrderQty = async (sku) => {
          try {
            const res = await axios.get(
              `http://localhost:8800/api/salesorders/order/qty/${sku}`
            );
            const qtyData = res.data;
            const latestQty =
              qtyData.length > 0 ? qtyData[qtyData.length - 1].qty : 0;
            return latestQty;
          } catch (err) {
            console.error("Error fetching sales order quantity", err);
            return 0;
          }
        };

        const updatedProducts = await Promise.all(
          productsData.map(async (product) => {
            // Fetch the latest purchase quantity and sold quantity
            const purchaseQty = await getGoodReceiveQty(product.sku);
            const soldQty = await getSalesOrderQty(product.sku);

            // Calculate the changes in purchase quantity and sold quantity
            const purchaseQtyChange = purchaseQty - product.purchaseQty;
            const soldQtyChange = soldQty - product.soldQty;

            // Update the stock based on the changes
            const newStock = product.stock + purchaseQtyChange - soldQtyChange;

            console.log(`Purchase Qty Change: ${purchaseQtyChange}`);
            console.log(`Sold Qty Change: ${soldQtyChange}`);
            console.log(`New Stock: ${newStock}`);

            // Return the updated product object
            return {
              ...product,
              purchaseQty,
              soldQty,
              stock: newStock,
            };
          })
        );

        setProducts(updatedProducts);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchAllData();
  }, []);

  const handleReservation = (e) => {
    navigate("/reservation");
    e.preventDefault();
  };

  const handleReturn = (e) => {
    navigate("/return");
    e.preventDefault();
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
                <th>Product SKU</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productid}>
                  <td>{product.sku}</td>
                  <td>
                    <img
                      src={product.image || productImage}
                      alt="Product"
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td>{product.productname}</td>
                  <td>{product.stock}</td>
                  <td>{product.sellingprice}</td>
                </tr>
              ))}
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
