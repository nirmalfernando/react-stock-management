import React, { useEffect, useState } from "react";
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

function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // Initialize role state

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user")); // Get role from localStorage
    let role = user?.role; // Access role property with optional chaining
    setRole(role); // Set role state with retrieved value
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const tabs = [
    { label: "Dashboard", icon: FaDisplay, roles: ["Admin", "User"] },
    { label: "Inventory", icon: FaApple, roles: ["Admin", "User"] },
    {
      label: "Product",
      icon: HiMiniDevicePhoneMobile,
      roles: ["Admin", "User"],
    },
    { label: "POS", icon: BsSuitcaseLg, roles: ["Admin"] },
    { label: "Customer", icon: FaRegUser, roles: ["Admin"] },
    { label: "Reports", icon: BiMessageRounded, roles: ["Admin"] },
  ];

  const changeActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="shopname">
          <BsPhoneFlip />
          <h2 style={{ marginBottom: "20px", marginTop: "10px" }}>
            I-PLUS
          </h2>
        </div>
        {role && // Render tabs only if role is defined
          tabs.map((tab, index) => {
            if (tab.roles.includes(role)) {
              return (
                <button
                  key={index}
                  className={
                    activeTab === tab.label.toLowerCase() ? "active" : ""
                  }
                  onClick={() => changeActiveTab(tab.label.toLowerCase())}
                >
                  <tab.icon />
                  <span>{tab.label}</span>
                </button>
              );
            }
            return null;
          })}
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
};

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
