import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";
const AdminNavbar = () => {
    const nav = useNavigate();
    axios.defaults.withCredentials = true;
    const handleLogout = async () => {
        const res = await axios.get("http://localhost:5000/logout");
        if (res.status === 200) {
            nav("/Admin");
        }

    }
    return (
        <>
            <div className="container-fluid bg-info-subtle ">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-2">
                        <Link to="/AdminInsert">Home<HomeIcon></HomeIcon></Link>
                    </div>
                    <div className="col-3">
                        <h3>Admin E-Menu</h3>
                    </div>
                    <div className="col-3 text-center">
                        <Link to="/AdminViewOrders">Customers Order's</Link>  <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
                    </div>
                    <div className="col-3 text-center">
                        <button className="btn btn-danger" onClick={handleLogout}> Logout </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminNavbar;
