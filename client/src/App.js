import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Add from "./pages/Add";
import Update from "./pages/Update";
import RegistrationForm from "./pages/RegisterPage/RegistrationForm";
import Login from "./pages/LoginPage/Login";
import SideBar from "./SideBar";
import Product from "./pages/Products/Products";
import Dashboard from "./pages/Dashboard/DashContent";
import POS from "./pages/POS/POS";
import Inventory from "./pages/Inventory/Inventory";
import BillInfo from "./BillInfo/BillInfo";
import GoodReceive from "./pages/GoodReceive/GoodReceive";
import GoodReturn from "./pages/GoodReturn/GoodReturn";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SideBar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/side" element={<SideBar />} />
          <Route path="/product" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/bill" element={<BillInfo />} />
          <Route path="/reservation" element={<GoodReceive />} />
          <Route path="/return" element={<GoodReturn />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
