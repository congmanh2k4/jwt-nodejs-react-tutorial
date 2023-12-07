import express from "express";
// import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
const app = express();

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// //test connection
// connection();

//init web route
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=> {
    console.log(">> JWT Backend is running on the port = " + PORT);
})