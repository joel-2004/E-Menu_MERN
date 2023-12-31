import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom"
const AdminNavbar = () => {
    return (
        <>
            <div className="container-fluid bg-info-subtle ">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <Link to="/AdminInsert">Home<HomeIcon></HomeIcon></Link>
                    </div>
                    <div className="col-4">
                        <h3>Admin E-Menu</h3>
                    </div>
                    <div className="col-4 text-center">
                        <Link to="/AdminViewOrders">Customers Order's</Link>  <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminNavbar;
