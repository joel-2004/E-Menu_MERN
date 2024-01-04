// HomeData.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cart from "./Cart";

const HomeData = () => {
    const [list, setList] = useState([]);
    const [cart, setCart] = useState([]);

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
        await axios.post("http://localhost:5000/cart", { cartItems: cart });
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
                <div className="col-2 d-flex flex-column align-items-center">
                    <Cart cart={cart}></Cart>
                    <div className="col-1 mt-2">
                        <button onClick={orderFood} className="btn btn-info">
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeData;
