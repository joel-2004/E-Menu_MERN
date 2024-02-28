import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminViewOrders = () => {
    axios.defaults.withCredentials = true;
    const nav = useNavigate();
    const [orderList, setOrderList] = useState([]);
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
                const res = await axios.get("http://localhost:5000/getOrderData");
                setOrderList(res.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [orderList])

    // useEffect(() => {
    //     console.log(orderList);

    // }, [orderList])

    const handleFinishedCooking = async (id) => {
        console.log(id);
        await axios.delete(`http://localhost:5000/deleteOrderData/${id}`);
    }
    if (orderList.length === 0) {
        return (<>
            <AdminNavbar></AdminNavbar>
            <div className="container-fludid">

                <div className="row m-3">
                    <h4><strong>No food item's ordered</strong></h4>

                </div>
            </div>

        </>)
    }
    return (
        <>
            <AdminNavbar></AdminNavbar>

            {orderList.map((e) => {
                return (
                    <div className="container-fluid p-3 " key={e._id}>

                        <div className="row m-2">
                            <div className="col-3"><h6>Name:{e.customerName}</h6></div>
                            <div className="col-3"><h6>Table Number:{e.tableNumber}</h6></div>
                            <div className="col-3"><h6>Total Amount:{e.totalAmount}</h6></div>
                        </div>
                        <div className="row m-2">
                            <div className="col-3">
                                <h4>        FoodName</h4>
                            </div>
                            <div className="col-3">
                                <h4>    FoodPrice </h4>
                            </div>
                        </div>
                        {e.cartItems.map((p, index) => {
                            return (<div className="row m-2" key={index} >
                                <div className="col-3">
                                    {p.name}
                                </div>
                                <div className="col-3">
                                    {p.price}
                                </div>
                            </div>);
                        })}
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-3">
                                <button className="btn btn-primary" onClick={() => handleFinishedCooking(e._id)} >Finished Cooking</button>
                            </div>
                        </div>

                    </div>);
            })}
        </>
    );
};

export default AdminViewOrders;
