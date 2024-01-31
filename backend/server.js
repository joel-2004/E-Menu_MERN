//import
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
const authToken = require("./middleware/authToken");

//getting util from backend util
const backendUtil = require("./util/backendUtil");

const insertFood = backendUtil.insertFood;
const getFood = backendUtil.getFood;
const orders = backendUtil.orders;
const deleteById = backendUtil.deletById;
const getOrderData = backendUtil.getOrderData;
const deleteOrderData = backendUtil.deleteOrderData;
const checkIfCooked = backendUtil.checkIfCooked;
const reset = backendUtil.reset;
const adminLogin = backendUtil.adminLogin;

//Methods 
//middle wares
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookie());
//Admin
app.post("/insertFood", authToken, insertFood);
app.delete("/delete/:id", authToken, deleteById)
app.get("/getOrderdata", authToken, getOrderData);
app.delete("/deleteOrderData/:id", authToken, deleteOrderData);
app.delete("/reset", authToken, reset);

app.post("/AdminLogin", adminLogin);

//Users
app.get("/getFoodData", getFood);
app.post("/orders", orders);
app.post("/checkIfCooked", checkIfCooked);

//server
app.listen(process.env.PORT, (req, res) => {
    console.log("Server started");
})