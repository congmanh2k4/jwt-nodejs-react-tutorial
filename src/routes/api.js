import express from "express";
import apiController from "../controller/apiController"
const router = express.Router();


/**
 * 
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.get('/test-api', apiController.testApi);
    return app.use("/api/", router);
}
export default initApiRoutes;