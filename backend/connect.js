import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@Pasith#2002",
  database: "iplus",
});

db.connect((err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log("Database connected!!!");
});
