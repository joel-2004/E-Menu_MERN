import axios from "axios";
import React, { useEffect, useState } from "react";
import Cart from "../Cart";
import { toast } from 'react-toastify';

const HomeUtil = () => {
    const [list, setList] = useState([]);
    const [cart, setCart] = useState([]);
    const [name, setName] = useState("");
    const [tableNo, setTableNo] = useState("");
    const [idForCheck, setIdForSuccess] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const food = await axios.get("http://localhost:5000/getFoodData");
                setList(food.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    });

    const addToCart = async (name, price, id) => {
        const newItem = {
            name: name,
            price: price,
            _id: id,
        };
        setCart([...cart, newItem]);
    };

    const orderFood = async () => {
        let total = 0;
        cart.forEach((e) => {
            total += Number(e.price);
        });
        var re = /^[A-Za-z]+$/;
        // console.log(total + " " + name + " " + tableNo);
        if (total === 0)
            toast.error("Add food to cart", { position: "top-center" });
        else if (name === "")
            toast.error("Please give your name", { position: "top-center" });
        else if (tableNo === "" || re.test(tableNo))
            toast.error("Please give table number", { position: "top-center" });
        else {
            const orderData = {
                customerName: name,
                tableNumber: tableNo,
                cartItems: cart,
                total: total
            };
            console.log(orderData);
            const result = await axios.post("http://localhost:5000/orders", orderData);
            setIdForSuccess(result);
            console.log(result.data);
            toast.success("ordered", { position: "top-center" });
            setCart([]);
            setName("");
            setTableNo("");
        }
    };


    const checkIfCooked = async () => {
        console.log("hello");
        if (idForCheck === "") {
            toast.error("U have not ordered yet");
        }
        else {
            const result = await axios.post("http://localhost:5000/checkIfCooked", { id: idForCheck });
            console.log(result.data);
            const isFound = result.data;
            if (isFound === "found") {
                toast.dark("Please wait, food is still cooking");
            }
            else if (isFound === "notFound") {
                toast.success("Your order is ready, Kindly collect food from the counter");
                setIdForSuccess("");
            }

        }
    };

    if (list.length === 0) return (
        <>
            <div className="container-fludid">

                <div className="row m-3">
                    <h4>     <strong>Sorry, no food items are currently available.</strong></h4>
                </div>
            </div>
        </>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-2 m-2">
                            <h4>Name:</h4>
                        </div>
                        <div className="col-1 m-2">
                            <h4>Price:</h4>
                        </div>
                    </div>
                    {list.map((e, index) => (
                        <div className="row" key={e._id}>
                            <div className="col-2 m-2">{e.name}</div>
                            <div className="col-1 m-2">{e.price}</div>
                            <div className="col-2 m-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => addToCart(e.name, e.price, e._id)}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-3 mt-2">
                    <button className="btn btn-success" onClick={checkIfCooked}> Check Status</button>
                </div>
                <div className="col-3">
                    <div className="row">
                        <div className="col">
                            <Cart cart={cart}></Cart>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <form>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Table no:</label>
                                    <input type="text" className="form-control" value={tableNo} onChange={(e) => setTableNo(e.target.value)} ></input>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col d-flex justify-content-center ">
                            <button onClick={orderFood} className="btn btn-info">
                                Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeUtil;
