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

const initApiRoutes = (app) => {

  router.all('*', checkUserJWT, checkUserPermission);
  router.get("/user/read",userController.readFunc);
  router.get("/group/read", groupController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  return app.use("/api/", router);
};
export default initApiRoutes;
