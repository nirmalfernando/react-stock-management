import { db } from "../connect.js";

export const addPurchase = (req, res) => {
  const q =
    "INSERT INTO purchasingorder (`product`,`sku`,`unitprice`,`qty`,`total`) VALUES (?)";
  const values = [
    req.body.product,
    req.body.sku,
    req.body.unitprice,
    req.body.qty,
    req.body.total,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Purchasing Order has been created");
  });
};

export const updatePurchase = (req, res) => {
  const poID = req.params.id;
  const q =
    "UPDATE purchasingorder SET `product` = ?, `sku` = ?,`unitprice` = ?,`qty` = ?, `total` = ? WHERE poid = ?";

  const values = [
    req.body.product,
    req.body.sku,
    req.body.unitprice,
    req.body.qty,
    req.body.total,
  ];

  db.query(q, [...values, poID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Purchasing Order has been updated successfully");
  });
};

export const deletePurchase = (req, res) => {
  const poID = req.params.id;
  const q = "DELETE FROM purchasingorder WHERE poid = ?";

  db.query(q, [poID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Purchasing Order has been deleted");
  });
};

export const getPurchase = (req, res) => {
  const poID = req.params.id;
  const q = "SELECT * FROM purchasingorder WHERE poid = ?";
  db.query(q, [poID], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getPurchases = (req, res) => {
  const q = "SELECT * FROM purchasingorder";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
