import React, { useState } from "react";
import axios from "axios"

const AdminInsert = () => {
    const [food, setFood] = useState("");
    const [price, setPrice] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            food: food,
            price: price

        }
        console.log(data);
        setFood("");
        setPrice("");
        try {
            await axios.post("http://localhost:5000/insertFood", { data: data })
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="foodName">FoodName</label>
                            <input type="text" id="foodName" value={food} onChange={(e) => setFood(e.target.value)} ></input>
                            <label htmlFor="price">Price</label>
                            <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminInsert;
