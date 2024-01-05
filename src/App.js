import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/User/Home";
import AdminViewOrders from "./components/Admin/AdminViewOrders";
import AdminInsert from "./components/Admin/AdminInsert";
import AdminLogin from "./components/Admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>

      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/Admin" element={<AdminLogin></AdminLogin>}></Route>
          <Route path="/AdminInsert" element={<AdminInsert></AdminInsert>}></Route>
          <Route path="/AdminViewOrders" element={<AdminViewOrders></AdminViewOrders>}></Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
