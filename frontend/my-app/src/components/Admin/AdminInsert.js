import React, { useEffect, useState } from "react";
import axios from "axios"
import AdminNavbar from "./AdminNavbar";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AdminInsert = () => {
    axios.defaults.withCredentials = true;
    const [food, setFood] = useState("");
    const [price, setPrice] = useState(null);
    const [list, setList] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        const auth = async () => {
            try {
                const res = await axios.get("http://localhost:5000/adminViewOrdersAuth");
                //  console.log(res);
                if (res.status !== 200) {
                    nav("/Admin")
                }
            }
            catch (err) {
                console.log(err);
                nav("/Admin")
            }
        };
        auth();
    }, [])

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

    const handleReset = async () => {
        try {
            toast.error("Reset");
            await axios.delete("http://localhost:5000/reset")
        } catch (error) {

        }
    }
    if (list.length === 0) {
        return (<>
            <AdminNavbar></AdminNavbar>
            <div className="container-fludid">
                <div className="row">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="foodName" className="m-1">Food Name</label>
                            <input type="text" id="foodName" className="input-group-sm m-1" value={food} onChange={(e) => setFood(e.target.value)} ></input>
                            <label htmlFor="price" className="m-2">Price</label>
                            <input type="number" id="price" className="m-2" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                            <button type="submit" className="btn btn-primary m-2">Add</button>
                        </form>
                    </div>
                </div>
                <div className="row m-3">
                    <h4><strong>No food item's added</strong></h4>

                </div>
            </div>

        </>)
    }
    return (
        <>
            <AdminNavbar></AdminNavbar>
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
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <button className="btn btn-danger" onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminInsert;
