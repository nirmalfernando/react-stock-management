import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  //Check existing user
  const q = "SELECT * from user WHERE UserID = ?";

  db.query(q, [req.body.UserID], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a User
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //Register a new user to the Database
    const q =
      "INSERT INTO user (`UserID`, `UserName`, `Name`, `Email`, `PhoneNo`, `Password `,`Image`,`Role`, `Status`,`StatusDate`) VALUES (?)";
    const values = [
      req.body.UserID,
      req.body.UserName,
      req.body.Name,
      req.body.Email,
      req.body.PhoneNo,
      hash,
      req.body.Image,
      req.body.Role,
      req.body.Status,
      req.body.StatusDate,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been successfully created!");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
