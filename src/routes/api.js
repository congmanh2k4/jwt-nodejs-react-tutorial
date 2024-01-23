import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import {checkUserJWT, checkUserPermission } from "../middleware/JWTAction"
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

// const testMiddleWare = (req, res, next) => {
//   console.log("calling a middleware");
//   if(true) {
//     return res.send("reject middleware");
//   }
//   next();
// }

// const checkUserLogin = (req, res, next) => {
//   const nonSecurePaths = ['/', '/register', '/login'];
//   if(nonSecurePaths.includes(req.path)) return next();

//   next();
// }

const initApiRoutes = (app) => {
  router.get("/user/read", checkUserJWT, checkUserPermission ,userController.readFunc);
  router.get("/group/read", groupController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  return app.use("/api/", router);
};
export default initApiRoutes;
