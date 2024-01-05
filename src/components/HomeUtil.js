import axios from "axios";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";

const HomeUtil = () => {
    const [list, setList] = useState([]);
    const [cart, setCart] = useState([]);
    const [name, setName] = useState("");
    const [tableNo, setTableNo] = useState(0);

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
    }, []);

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
        // console.log(total + " " + name + " " + tableNo);
        const orderData = {
            customerName: name,
            tableNumber: tableNo,
            cartItems: cart,
            total: total
        };

        console.log(orderData);

        // Make sure the axios.post request sends the correct data structure
        await axios.post("http://localhost:5000/orders", orderData);
    };

    if (list.length === 0) return <>No food available</>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
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
                <div className="col-4">
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
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)}></input>
                                </div>
                                <div className="form-group">
                                    <label>Table no:</label>
                                    <input type="text" className="form-control" onChange={(e) => setTableNo(e.target.value)} ></input>
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
