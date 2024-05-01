import { db } from "../connect.js";

export const addGoodReceive = (req, res) => {
  const { invoiceid, date, discount, tax, total, orders } = req.body;

  // Insert into goodreceive table
  const goodReceiveQuery =
    "INSERT INTO goodreceive (invoiceid, date, discount, tax, total) VALUES (?, ?, ?, ?, ?)";

  const goodReceiveValues = [invoiceid, date, discount, tax, total];

  db.query(goodReceiveQuery, goodReceiveValues, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to insert into Good Receive table", err });
    }

    // Get the inserted good receive ID
    const goodReceiveID = result.insertId;

    let placeholders = "";
    const goodReceiveDetailsValues = [];

    orders.forEach((order, index) => {
      placeholders +=
        index === 0 ? "(?, ?, ?, ?, ?, ?)" : ", (?, ?, ?, ?, ?, ?)";
      goodReceiveDetailsValues.push(
        goodReceiveID,
        order.sku,
        order.product,
        order.unitprice,
        order.qty,
        order.total
      );
    });

    const goodReceiveDetailsQuery = `INSERT INTO goodreceive_details (grnno, sku, product, unitprice, qty, total) VALUES ${placeholders}`;

    db.query(
      goodReceiveDetailsQuery,
      goodReceiveDetailsValues,
      (err, result) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json("Good Receive Note has been created");
      }
    );
  });
};

export const getGoodReceiveQty = (req, res) => {
  const salesID = req.params.id;
  const q = "SELECT qty FROM goodreceive_details WHERE sku = ?";
  db.query(q, [salesID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
