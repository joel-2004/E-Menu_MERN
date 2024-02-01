const axios = require("axios");
const schemas = require("../db");
const ObjectId = require('mongodb').ObjectId;
const foodCollection = schemas.foodCollection;
const orderCollection = schemas.orderCollection;
const jwt = require("jsonwebtoken");

const insertFood = async (req, res) => {
    // console.log(req.user.username);
    // console.log(req.body.food);
    //const data = req.body.data;
    const newData = {
        name: req.body.food,
        price: req.body.price
    }
    // console.log(data);
    // console.log(newData.name + " " + newData.price);
    await foodCollection.insertMany([{ name: req.body.food, price: req.body.price }]);
    return res.status(201).send("Food inserted successfully");
};

const getFood = async (req, res) => {

    const data = await foodCollection.find({});
    //console.log(data);
    res.json(data);
}

const orders = async (req, res) => {
    try {
        const orderData = req.body;
        const data = {
            name: orderData.customerName,
            tableNumber: orderData.tableNumber,
            cartItems: orderData.cartItems,
            total: orderData.total
        };

        // console.log(data);
        const result = await orderCollection.insertMany({
            customerName: data.name,
            tableNumber: data.tableNumber,
            cartItems: data.cartItems,
            totalAmount: data.total
        });
        //console.log(result);
        const orderId = result[0]._id;
        // console.log(orderId);
        const objectId = new ObjectId(orderId);
        const extractedId = objectId.toString();

        //console.log(extractedId);
        res.status(201).send(extractedId);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const deletById = async (req, res) => {
    try {
        const id = req.params.id;
        await foodCollection.deleteOne({ "_id": id });
    } catch (e) {
        console.log(e);
    }
};


const getOrderData = async (req, res) => {
    try {
        const data = await orderCollection.find();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const deleteOrderData = async (req, res) => {
    try {
        const id = req.params.id;
        await orderCollection.deleteOne({ "_id": id });
    }
    catch (e) {
        console.log(e);
    }
}

const checkIfCooked = async (req, res) => {
    try {
        console.log(req.body.id.data);
        const id = req.body.id.data;
        const result = await orderCollection.find({ _id: id });
        if (result.length === 0)
            res.json("notFound");
        else {
            res.json("found");
        }

    } catch (error) {

    }
}


const reset = async (req, res) => {
    await foodCollection.deleteMany({});
}

const adminLogin = (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    // console.log(name + " " + password);

    if (password !== "admin" || name !== "admin") {
        // console.log("hello");
        res.status(401).json(
            { msg: "wrong username or password" }
        );
    }
    else {
        const accessToken = jwt.sign(
            { username: name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );
        // console.log(process.env.ACCESS_TOKEN_SECRET);
        // const refreshToken = jwt.sign(
        //     { "username": req.body.name },
        //     process.env.REFRESH_TOKEN_SECRET,
        //     { expiresIn: "1d" }
        // )
        //console.log(process.env.REFRESH_TOKEN_SECRET);
        res.cookie("jwt", accessToken, { httpOnly: true }).send("login successful" + accessToken);
        //res.json({ accessToken });
    }
}

module.exports = { insertFood, getFood, orders, deletById, getOrderData, deleteOrderData, checkIfCooked, reset, adminLogin };
