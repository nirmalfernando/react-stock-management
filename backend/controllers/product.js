import { db } from "../connect.js";

export const addProduct = (req, res) => {
  const q =
    "INSERT INTO product (`locationid`,`createdon`,`product`,`productacronym`,`brand`,`image`) VALUES (?)";
  const values = [
    req.body.locationid,
    req.body.createdon,
    req.body.product,
    req.body.productacronym,
    req.body.brand,
    req.body.image,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product has been created");
  });
};

export const updateProduct = (req, res) => {
  const productID = req.params.id;
  const q =
    "UPDATE product SET `product` = ?, `productacronym` = ?, `brand` = ?, `image` = ? WHERE productid = ?";

  const values = [
    req.body.product,
    req.body.productacronym,
    req.body.brand,
    req.body.image,
  ];

  db.query(q, [...values, productID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product has been updated successfully");
  });
};

export const deleteProduct = (req, res) => {
  const productID = req.params.id;
  const q = "DELETE FROM product WHERE productid = ?";

  db.query(q, [productID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product has been deleted");
  });
};

export const getProduct = (req, res) => {
  const productID = req.params.id;
  const q = "SELECT * FROM product WHERE productid = ?";
  db.query(q, [productID],(err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

export const getProducts = (req, res) => {
  const q = "SELECT * FROM product";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
