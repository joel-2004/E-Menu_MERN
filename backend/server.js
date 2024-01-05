const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const schemas = require("./db");
const ObjectId = require('mongodb').ObjectId;
const foodCollection = schemas.foodCollection;
const orderCollection = schemas.orderCollection;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/insertFood", (req, res) => {
    const data = req.body.data;
    const newData = {
        name: data.food,
        price: data.price
    }
    // console.log(data);
    // console.log(newData.name + " " + newData.price);
    foodCollection.insertMany([{ name: data.food, price: data.price }]);
})

app.get("/getFoodData", async (req, res) => {

    const data = await foodCollection.find({});
    //console.log(data);
    res.json(data);
})

app.post("/orders", async (req, res) => {
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
});


app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await foodCollection.deleteOne({ "_id": id });

    } catch (e) {
        console.log(e);
    }
})

app.get("/getOrderdata", async (req, res) => {
    try {
        const data = await orderCollection.find();
        res.json(data);
    } catch (error) {
        console.log(error);
    }
})

app.delete("/deleteOrderData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await orderCollection.deleteOne({ "_id": id });
    }
    catch (e) {
        console.log(e);
    }
})

app.post("/checkIfCooked", async (req, res) => {
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
})


app.delete("/reset", async (req, res) => {
    await foodCollection.deleteMany({});
})



app.listen("5000", (req, res) => {
    console.log("Server started");
})