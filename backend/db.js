const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/food").then(() => console.log("Connected to db")).catch(() => console.log("error in db connection"));

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const cartItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    tableNumber: { type: String, required: true },
    cartItems: [cartItemSchema],
    totalAmount: { type: Number, required: true },
});

const foodCollection = mongoose.model("foodCollection", foodSchema);
const orderCollection = mongoose.model("orderCollection", orderSchema);
const schemas = { foodCollection, orderCollection };
module.exports = schemas;