import React, { useEffect, useState } from "react";
import axios from "axios"
const Home = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const food = await axios.get("http://localhost:5000/getFoodData");
                // console.log(food.data);
                setList(food.data);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [list])
    return (<>
        {list.map((e) =>
            <div>
                <h1>{e.name}</h1>
                <h1>{e.price}</h1>
            </div>
        )}
    </>)
};

export default Home;
