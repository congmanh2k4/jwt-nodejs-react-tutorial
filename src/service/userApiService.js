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
         attributes: ["id", "phone", "username", "email", "address", "sex"],
         include: {
            model: db.Group,
            attributes: ["name", "description", "id"],
         },
         order: [["id", "DESC"]],
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
      if (!data.group) {
         return {
            EM: "error with empty group",
            EC: 1,
            DT: "group",
         };
      }
      const user = await db.User.findByPk(data.id);
      if (user) {
         user.set({
            username: data.username,
            address: data.address,
            sex: data.sex,
            groupId: data.group,
         });
         await user.save();
         return {
            EM: "update success ",
            EC: 0,
            DT: [],
         };
      } else {
         return {
            EM: "user not found",
            EC: 1,
            DT: [],
         };
      }
   } catch (error) {
      console.log(">>check log: ", error);
      return {
         EM: "something wrong",
         EC: 1,
         DT: [],
      };
   }
};
const checkEmailExist = async (userEmail) => {
   let isExist = await db.User.findOne({
      where: { email: userEmail },
   });
   if (isExist) {
      return true;
   }
   return false;
};
const checkPhoneExist = async (userPhone) => {
   let isExist = await db.User.findOne({
      where: { phone: userPhone },
   });
   if (isExist) {
      return true;
   }
   return false;
};
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};
const createUser = async (rawUser) => {
   try {
      let isEmailExist = await checkEmailExist(rawUser.email);
      if (isEmailExist === true) {
         return {
            DT: "email",
            EM: "The email is already exist",
            EC: "1",
         };
      }
      let isPhoneExist = await checkPhoneExist(rawUser.phone);
      if (isPhoneExist === true) {
         return {
            DT: "phone",
            EM: "The phone is already exist",
            EC: "1",
         };
      }
      //hash password
      let hassPassword = await hashUserPassword(rawUser.password);
      //create user
      await db.User.create({
         username: rawUser.username,
         email: rawUser.email,
         phone: rawUser.phone,
         sex: rawUser.sex,
         groupId: rawUser.group,
         address: rawUser.address,
         password: hassPassword,
      });
      return {
         EM: "create success ",
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
