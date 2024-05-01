import { db } from "../connect.js";

export const addGoodReturn = (req, res) => {
  const { billid, date, discount, tax, total, orders } = req.body;

  // Insert into goodreturn table
  const goodReturnQuery =
    "INSERT INTO goodreturn (billid, date, discount, tax, total) VALUES (?, ?, ?, ?, ?)";

  const goodReturnValues = [billid, date, discount, tax, total];

  db.query(goodReturnQuery, goodReturnValues, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to insert into Good Return table", err });
    }

    // Get the autoincremented grnno from the inserted row
    const grnno = result.insertId;

    let placeholders = "";
    const goodReturnDetailsValues = [];

    orders.forEach((order, index) => {
      placeholders +=
        index === 0 ? "(?, ?, ?, ?, ?, ?)" : ", (?, ?, ?, ?, ?, ?)";
      goodReturnDetailsValues.push(
        grnno,
        order.sku,
        order.product,
        order.unitprice,
        order.qty,
        order.total
      );
    });

    const goodReturnDetailsQuery = `INSERT INTO goodreturn_details (grnno, sku, product, unitprice, qty, total) VALUES ${placeholders}`;

    db.query(goodReturnDetailsQuery, goodReturnDetailsValues, (err, result) => {
      if (err) return res.status(500).json({ error: err });

      return res.status(200).json("Good Return Note has been created");
    });
  });
};

export const getGoodReturnQty = (req, res) => {
  const salesID = req.params.id;
  const q = "SELECT qty FROM goodreturn_details WHERE sku = ?";
  db.query(q, [salesID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
