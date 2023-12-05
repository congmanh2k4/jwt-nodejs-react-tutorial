import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);
  connection.query(
    "INSERT INTO user (email,password,username) VALUES (?, ?, ?)",
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};
const getUserList = () => {
    let users = [];
    connection.query(
    "SELECT * FROM user ",
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log("get user", results);
    }
  );
}
module.exports = {
  createNewUser,
  getUserList
};
