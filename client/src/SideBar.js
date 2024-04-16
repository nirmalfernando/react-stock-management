import React, { useState } from "react";
import "./SideBar.css";
import Products from "./pages/Products/Products";
import { FaDisplay, FaRegUser } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { BsSuitcaseLg } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { BsPhoneFlip } from "react-icons/bs";
import DashContent from "./pages/Dashboard/DashContent";
import POS from "./pages/POS/POS";
import Inventory from "./pages/Inventory/Inventory";
import { useNavigate } from "react-router-dom";
import Category from "./pages/Category/Category";
import { handleMobileClick } from "./pages/Category/Category";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleImageClick = () => {
    setActiveTab("inventory"); // Set active tab to 'inventory'
  };
  const changeActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="shopname">
          <BsPhoneFlip />
          <h2 style={{ marginBottom: "20px", marginTop: "10px" }}>I-PLUS</h2>
        </div>
        <button
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => changeActiveTab("dashboard")}
        >
          <FaDisplay />
          <span>Dashboard</span>
        </button>
        <button
          className={activeTab === "inventory" ? "active" : ""}
          onClick={() => changeActiveTab("inventory")}
        >
          <FaApple />
          <span>Inventory</span>
        </button>
        <button
          className={activeTab === "product" ? "active" : ""}
          onClick={() => changeActiveTab("product")}
        >
          <HiMiniDevicePhoneMobile />
          <span>Product</span>
        </button>
        <button
          className={activeTab === "pos" ? "active" : ""}
          onClick={() => changeActiveTab("pos")}
        >
          <BsSuitcaseLg />
          <span>POS</span>
        </button>
        <button
          className={activeTab === "customer" ? "active" : ""}
          onClick={() => changeActiveTab("customer")}
        >
          <FaRegUser />
          <span>Customer</span>
        </button>
        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => changeActiveTab("reports")}
        >
          <BiMessageRounded />
          <span>Reports</span>
        </button>
      </div>

      <div className="content">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "inventory" && <InventoryTab />}
        {activeTab === "product" && <ProductTab />}
        {activeTab === "pos" && <POSTab />}
        {activeTab === "customer" && <CustomerTab />}
        {activeTab === "reports" && <ReportsTab />}
      </div>
    </div>
  );
}

function DashboardTab() {
  return (
    <div>
      <DashContent />
      <Category />
    </div>
  );
}

function InventoryTab() {
  return (
    <div>
      <Inventory />
    </div>
  );
}

function ProductTab() {
  return (
    <div>
      <Products />
    </div>
  );
}

function POSTab() {
  return (
    <div>
      <POS />
    </div>
  );
}

function CustomerTab() {
  return <div>Customer Tab Content</div>;
}

function ReportsTab() {
  return (
    <div>
      <DashContent />
    </div>
  );
}

export default Dashboard;
