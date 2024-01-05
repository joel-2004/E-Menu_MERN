import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom"
const NavbarUser = () => {
    return (
        <>
            <div className="container-fluid bg-info-subtle ">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <h3>   E-Menu</h3>
                    </div>
                    <div className="col-4 text-center">
                        <Link>    Cart </Link>  <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarUser;
