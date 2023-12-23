import mysql from "mysql2/promise";
import bluebird from "bluebird";
import bcrypt from "bcryptjs";
import db from "../models/index";
import { Op } from "sequelize";
import { raw } from "body-parser";
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
const checkUsernameExist = async (Username) => {
  let isExist = await db.User.findOne({
    where: { username: Username },
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
const createRegisterNewUser = async (rawUser) => {
  try {
    //check email/phone/username/password
    let isEmailExist = await checkEmailExist(rawUser.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: "1",
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUser.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist",
        EC: "1",
      };
    }
    let isUsernameExist = await checkUsernameExist(rawUser.username);
    if (isUsernameExist === true) {
      return {
        EM: "The username is already exist",
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
      password: hassPassword,
    });
    return {
      EM: "Successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: "-2",
    };
  }
};
const checkPassword = (inputPassword, hassPassword) => {
  return bcrypt.compareSync(inputPassword, hassPassword);
};
const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    // console.log("check javascript user", user.get({ plain: true }));
    // console.log("check sequelize user", user);
    if (user) {
        console.log(">>>found user with email/phone");
      let isCheckPassword = checkPassword(rawData.password, user.password);
      if (isCheckPassword === true) {
        return {
          EM: "Ok",
          EC: 0,
          DT: "",
        };
      }
    }
    console.log(">>>not found user with email/phone", rawData.valueLogin," password",rawData.password);
    return {
      EM: "Your email/phone or password is incorrect.",
      EC: 1,
      DT: "",
    };

    return {
      EM: "Something wrong",
      EC: "-2",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrong",
      EC: "-2",
    };
  }
};
module.exports = {
  createRegisterNewUser,
  handleUserLogin,
};
