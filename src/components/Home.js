import React, { useEffect, useState } from "react";
import axios from "axios"
const Home = () => {
    const [list, setList] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const food = await axios.get("http://localhost:5000/getFoodData");
                console.log(food.data);
                setList(food.data);
            }
            catch (e) {
                console.log(e);
            }
        }

        fetchData();

    }, [])

    // useEffect(() => {
    //     console.log(cart);
    // }, [cart]); // Log cart whenever it changes

    const addToCart = (name, price, id) => {
        console.log(name + " " + price + " " + id);
        setCart([...cart, [name, price, id]]);

    }
    return (<>

        {list.map((e, index) =>
            <div className="container-fluid" key={e._id}>
                <div className="row">
                    <div className="col-2 m-2">
                        {e.name}
                    </div>
                    <div className="col-1 m-2">
                        {e.price}
                    </div>
                    <div className="col-2 m-2">
                        <button className="btn btn-primary" onClick={() => addToCart(e.name, e.price, e._id)}>Add</button>
                    </div>
                </div>
            </div>
        )}
    </>)
};

export default Home;
