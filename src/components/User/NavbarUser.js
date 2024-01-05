import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const NavbarUser = () => {
    return (
        <>
            <div className="container-fluid bg-info-subtle ">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <h3>User E-Menu</h3>
                    </div>
                    <div className="col-3 text-center">
                        Cart  <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarUser;
