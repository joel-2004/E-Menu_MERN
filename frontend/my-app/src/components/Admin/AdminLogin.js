import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"
const AdminLogin = () => {
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (form.name === "" && form.password === "") {
                toast.error("Enter name and password");
            }
            else {
                //window.location.replace("/AdminInsert");
                const send = await axios.post("http://localhost:5000/AdminLogin", { name: form.name, password: form.password })
                    .then((response => {
                        console.log(response.data);
                    })).catch(error => {
                        console.log(error.message);
                        toast.error("Wrong username or password");
                    })
                    ;

            }

        } catch (e) {
            console.log(e);
        }
    };

    const [form, setForm] = useState({
        name: "",
        password: "",
    });

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className="col-4 text-center">
                <form className="bg-light p-4 rounded" method="post" onSubmit={handleSubmit}>
                    <h2 className="mb-4 text-primary">Admin Login</h2>
                    <label className="form-label m-1" htmlFor="name">
                        Username
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control m-1"
                        placeholder="Enter Username"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
                    <label className="form-label m-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control m-1"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    />
                    <button type="submit" className="btn btn-dark m-1 btn-lg">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
