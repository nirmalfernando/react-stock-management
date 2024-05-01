import { db } from "../connect.js";

export const addSalesOrder = (req, res) => {
  const { date, tax, discount, total, amountPaid, balance, items } = req.body;

  // Insert into salesorder table
  const salesOrderQuery =
    "INSERT INTO salesorder (date, tax, discount, total, amountpaid, balance) VALUES (?, ?, ?, ?, ?, ?)";

  const salesOrderValues = [date, tax, discount, total, amountPaid, balance];

  db.query(salesOrderQuery, salesOrderValues, (err, result) => {
    if (err) {
      console.error("Failed to insert into Sales Order table:", err);
      return res
        .status(500)
        .json({ error: "Failed to insert into Sales Order table" });
    }

    // Get the inserted sales order ID
    const salesOrderId = result.insertId;

    let placeholders = "";
    const salesOrderDetailsValues = [];

    items.forEach((item, index) => {
      placeholders +=
        index === 0 ? "(?, ?, ?, ?, ?, ?)" : ", (?, ?, ?, ?, ?, ?)";
      salesOrderDetailsValues.push(
        salesOrderId,
        item.sku,
        item.product,
        item.qty,
        item.unitprice,
        item.qty * item.unitprice
      );
    });

    const salesOrderDetailsQuery = `INSERT INTO salesorder_details (salesorderid, sku, product, qty, unitprice, total) VALUES ${placeholders}`;

    db.query(salesOrderDetailsQuery, salesOrderDetailsValues, (err, result) => {
      if (err) {
        console.error("Failed to insert into Sales Order Details table:", err);
        return res
          .status(500)
          .json({ error: "Failed to insert into Sales Order Details table" });
      }

      return res.status(200).json("Sales Order has been created");
    });
  });
};

export const getSalesOrder = (req, res) => {
  const salesID = req.params.id;
  const q = "SELECT * FROM salesorder_details WHERE salesorderid = ?";
  db.query(q, [salesID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getSalesOrders = (req, res) => {
  const q = "SELECT * FROM salesorder";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getSalesOrderQty = (req, res) => {
  const salesID = req.params.id;
  const q = "SELECT qty FROM salesorder_details WHERE sku = ?";
  db.query(q, [salesID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
