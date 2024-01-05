import mysql from "mysql2/promise";
import bluebird from "bluebird";
import bcrypt from "bcryptjs";
import db from "../models/index";

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "phone", "username", "email"],
      include: {
        model: db.Group,
        attributes: ["name", "description"],
      },
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "get data  successful",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const getAllUser = async () => {
  try {
    let user = await db.User.findAll({
      attributes: ["id", "phone", "sex", "username", "email"],
      include: {
        model: db.Group,
        attributes: ["name", "description"],
      },
    });
    if (user) {
      return {
        EM: "get data success ",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "get data success ",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error: ", error);
    return {
      EM: "something wrong",
      EC: 1,
      DT: [],
    };
  }
};
const updateUser = async (data) => {
  try {
  } catch (error) {
    console.log(">>check log: ", error);
  }
};
const createUser = async (data) => {
  try {
    await db.User.create({});
  } catch (error) {
    console.log(">>check log: ", error);
  }
};
const deleteUser = async (userId) => {
  try {
    await db.User.destroy({
      where: { id: userId },
    });
      return {
          EM: "delete data  successful",
          EC: 0,
          DT: [],
      };
  } catch (error) {
    console.log(">>check log: ", error);
      return {
          EM: "something wrong",
          EC: 1,
          DT: [],
      };
  }
};
module.exports = {
  getAllUser,
  updateUser,
  createUser,
  deleteUser,
  getUserWithPagination,
};
