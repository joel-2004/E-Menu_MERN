import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminViewOrders from "./components/AdminViewOrders";
import AdminInsert from "./components/AdminInsert";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>

      <BrowserRouter>
        <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/Admin" element={<AdminInsert></AdminInsert>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/AdminInsert" element={<AdminInsert></AdminInsert>}></Route>
          <Route path="/AdminViewOrders" element={<AdminViewOrders></AdminViewOrders>}></Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
