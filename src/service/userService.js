import mysql from "mysql2/promise";
import bluebird from "bluebird";
import bcrypt from "bcryptjs";
import db from "../models/index";

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (error) {}
};
const getUserList = async () => {
  //test relationship
  // let newUser = await db.User.findOne({
  //   where: {id: 1},
  //   attributes: ["id", "username","email"],
  //   include: {
  //     model: db.Group,
  //     attributes: [ "name","description"]
  //   },
  //   raw: true,
  //   nest: true
  // })
  // console.log("check new user: ", newUser);

  // let roles = await db.Role.findAll({
  //   include: {model: db.Group, where: {id:1}},
  //   attributes: [ "url","description"],
  //   raw: true,
  //   nest: true
  // });
  // console.log("check role: ", roles);

  let users = [];
  users = await db.User.findAll();
  return users;
};
const deleteUser = async (userId) => {
  try {
    await db.User.destroy({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.log("check error", error);
  }

  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
  // try {
  //   const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?',[id]);
  //   return rows;
  // } catch (error) {
  // }
};
const getUserById = async (userId) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: userId },
  });
  return user.get({ plain: true });
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
  // try {
  //   const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id=?',[id]);
  //   return rows;
  // } catch (error) {
  // }
};
const updateUserInfo = async (email, username, id) => {
  // console.log("check: ", email, username, id);
    await db.User.update(
    { email,username},
    {where: { id }}
  );
  
  // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
  // try {
  //   const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ?',[email,username,id]);
  //   return rows;
  // } catch (error) {
  // }
};
module.exports = {
  hashUserPassword,
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
