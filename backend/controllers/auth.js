import { db } from "../db.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //Check existing user
  const q = "SELECT * from user WHERE UserID = ?";

  db.query(q, [req.body.UserID], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a User
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

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

export const login = (req, res) => {
  //Check if the user exists or not
  const q = "SELECT * FROM user WHERE UserName = ?";

  db.query(q, [req.body.UserName], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password of the User
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.Password,
      data[0].Password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong UserName or Password!");

    const token = jwt.sign({ id: data[0].UserID }, "jwtkey");
    const { Password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been successfully logged out!");
};
