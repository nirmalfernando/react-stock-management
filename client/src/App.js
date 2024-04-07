import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import Add from "./pages/Add";
import Update from "./pages/Update";
import RegistrationForm from "./pages/RegisterPage/RegistrationForm";
import Login from "./pages/LoginPage/Login";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
