import { db } from "../connect.js";

export const addGoodReceive = (req, res) => {
  const { grnno, invoiceid, date, discount, tax, total, orders } = req.body;

  // Insert into goodreceive table
  const goodReceiveQuery =
    "INSERT INTO goodreceive (grnno, invoiceid, date, discount, tax, total) VALUES (?, ?, ?, ?, ?, ?)";

  const goodReceiveValues = [grnno, invoiceid, date, discount, tax, total];

  db.query(goodReceiveQuery, goodReceiveValues, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to insert into Good Receive table", err });
    }

    // Get the inserted good receive ID
    const goodReceiveID = grnno;

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
