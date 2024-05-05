import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK IF THE USER ALREADY EXISTS

  const q = "SELECT * FROM user WHERE userid = ? OR username=?";

  db.query(q, [req.body.userid, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //CREATE A NEW USER
    //ENCRYPTING THE PASSWORD
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //Current Date and Time
    const cdt = new Date();
    const date =
      cdt.toISOString().slice(0, 10) + " " + cdt.toTimeString().slice(0, 8);

    const q =
      "INSERT INTO user (`username`,`name`,`password`,`email`,`phoneno`,`image`,`role`,`status`,`statusdate`) VALUES (?)";

    const values = [
      req.body.username,
      req.body.name,
      hashedPassword,
      req.body.email,
      req.body.phoneno,
      req.body.image,
      req.body.role,
      1,
      cdt,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created!");
    });
  });
};

export const login = (req, res) => {
  //CHECK IF THE USER ALREADY EXISTS

  const q = "SELECT * FROM user WHERE username = ? AND status=1";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong Password or Username!");

    const token = jwt.sign({ id: data[0].userid,role:data[0].role }, process.env.JWT);

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out!");
};
