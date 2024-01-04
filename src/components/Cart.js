// Cart.js
import React from "react";

const Cart = ({ cart }) => {
    let total = 0;

    // Calculate total only once
    cart.forEach((e) => {
        total += Number(e.price);
    });

    return (
        <div className="container-fluid">
            {cart.map((e, index) => (
                <div className="row" key={e._id}>
                    <div className="col-2 m-2">{e.name}</div>
                    <div className="col-2 m-2">{e.price}</div>
                </div>
            ))}
            {/* Display total after all items */}
            <div className="row">
                <div className="col-4 m-2"><strong>Total:</strong></div>
                <div className="col-2 m-2"><strong>{total}</strong></div>
            </div>
        </div>
    );
};

export default Cart;
