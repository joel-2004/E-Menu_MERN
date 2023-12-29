import { BrowserRouter, Router } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import AdminInsert from "./components/AdminInsert";
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar></Navbar>
        <Home></Home> */}
        <AdminInsert></AdminInsert>
      </BrowserRouter>
    </>
  );
}

export default App;
