import React, { useEffect, useState } from "react";
import axios from "axios"
import NavbarAdmin from "./NavbarAdmin";
const AdminInsert = () => {
    const [food, setFood] = useState("");
    const [price, setPrice] = useState(null);
    const [list, setList] = useState([]);

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
    }, [list]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            food: food,
            price: price

        }
        setList([...list, data]);
        //console.log(list);
        setFood("");
        setPrice("");
        try {
            await axios.post("http://localhost:5000/insertFood", { data: data })
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete/${id}`)
            const newList = list.filter((e) => e.id !== id);
            setList(newList);
            console.log(newList);

        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <NavbarAdmin></NavbarAdmin>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="foodName">FoodName</label>
                            <input type="text" id="foodName" value={food} onChange={(e) => setFood(e.target.value)} ></input>
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2 m-2">
                        <h4>Name:</h4>
                    </div>
                    <div className="col-1 m-2">
                        <h4>Price:</h4>
                    </div>
                </div>
                {list.map((e, index) => (
                    <div className="row" key={index}>
                        <div className="col-2 m-2">{e.name}</div>
                        <div className="col-1 m-2">{e.price}</div>
                        <div className="col-2 m-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleDelete(e._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminInsert;
