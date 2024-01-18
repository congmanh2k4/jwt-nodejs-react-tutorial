import express from "express";
// import connection from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api"
require("dotenv").config();
import bodyParser from "body-parser";
import configCors from "./config/cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8080;

//config cors
configCors(app); 
//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//config cookie parser
app.use(cookieParser());

//init web route
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send("404 NOT FOUND");
})
app.listen(PORT,()=> {
    console.log(">> JWT Backend is running on the port = " + PORT);
})