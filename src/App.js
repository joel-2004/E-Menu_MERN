import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminViewOrders from "./components/AdminViewOrders";
import AdminInsert from "./components/AdminInsert";

function App() {
  return (
    <>
      <BrowserRouter>
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
