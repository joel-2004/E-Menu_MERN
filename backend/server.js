//import
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
// const authToken = require("./middleware/authToken");

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
const logout = backendUtil.logout;
const adminViewOrdersAuth = backendUtil.adminViewOrdersAuth;

//Methods 
//middle wares
dotenv.config();
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());
app.use(cookie());
//Admin with auth
// app.post("/insertFood", authToken, insertFood);
// app.delete("/delete/:id", authToken, deleteById)
// app.get("/getOrderdata", authToken, getOrderData);
// app.delete("/deleteOrderData/:id", authToken, deleteOrderData);
// app.delete("/reset", authToken, reset);

const auth = (req, res, next) => {
    try {
        //  console.log(req.cookies);
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(403).json({ "message": "token not found" });
        }
        //console.log(token);
        //console.log(process.env.ACCESS_TOKEN_SECRET);
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!verified) {
            return res.status(409).json({ "messsage": "not verified" });
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
}

app.post("/AdminLogin", adminLogin);

//Admin without AUth
app.post("/insertFood", auth, insertFood);
app.delete("/delete/:id", auth, deleteById)
app.get("/getOrderdata", auth, getOrderData);
app.delete("/deleteOrderData/:id", auth, deleteOrderData);
app.delete("/reset", auth, reset);
app.get("/logout", auth, logout);
app.get("/adminViewOrdersAuth", auth, adminViewOrdersAuth);
//Users
app.get("/getFoodData", getFood);
app.post("/orders", orders);
app.post("/checkIfCooked", checkIfCooked);

//server
app.listen(process.env.PORT, (req, res) => {
    console.log("Server started");
})