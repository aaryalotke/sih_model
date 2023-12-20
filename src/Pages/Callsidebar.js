import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import ChartOne from "./Chart_one";
import PricePredictionForm from "./PricePredictionForm";
import RestaurantManagerPage from "./RestaurantManagerPage";
import Profile from "./Profile";
import Updateprice from "./Updateprice";
import Dashboard from "./dashboard";
import NotificationsPage from "./notifications";
import InventoryManagement from "./inventory";
import Comparison from "./Comparison";
import DailySales from "./DailySales";
import Collaborate from "./Collaborate";
import TopDish from "./Top Dish/TopDish";

function Callsidebar() {
  const [activeTab, setActiveTab] = useState("profile");

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideComponent = () => {
      setIsVisible(false);
    };

    const timeoutId = setTimeout(hideComponent, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const welcomeMessageStyles = {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "3",
    height: isVisible ? "100%" : "0",
    opacity: isVisible ? "1" : "0",
    width: "100%",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    overflow: "hidden",
    transition: "height 0.5s ease-in-out, opacity 0.5s ease-in-out",
  };

  const welcomeMessage = isVisible && (
    <div style={welcomeMessageStyles}>
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-[#fff]">
        Welcome to <span className="text-blue-500">Byte Bistro</span>!
      </h1>
      <p className="text-[#e1e1e1]">
        Let's get started by setting up your restaurant profile. Fill in the
        details below:
      </p>
    </div>
  );
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-200">
      {welcomeMessage}
      {/* <div
        style={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "3",
          height: "100%",
          width: "100%",
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-[#fff]">
          Welcome to <span className="text-blue-500">Byte Bistro</span>!
        </h1>
        <p className="text-[#e1e1e1]">
          Let's get started by setting up your restaurant profile. Fill in the
          details below:
        </p>
      </div> */}
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div
        className="flex-1 p-10"
        style={{ overflowY: "auto", height: "100%" }}
      >
        {activeTab === "DailyPricePrediction" && <PricePredictionForm />}

        {activeTab === "messages" && <NotificationsPage />}
        {activeTab === "DailySales" && <DailySales />}
        {activeTab === "settings" && (
          <div>
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="text-lg">This is the settings content.</p>
          </div>
        )}
        {activeTab === "commodityPrediction" && <ChartOne />}
        {activeTab === "adddish" && <RestaurantManagerPage />}
        {activeTab === "Inventory" && <InventoryManagement />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "comparison" && <Comparison />}
        {activeTab === "updateprice" && <Updateprice />}
        {activeTab === "Collaborate" && <Collaborate />}
        {activeTab === "topDish" && <TopDish />}
      </div>
    </div>
  );
}

export default Callsidebar;
