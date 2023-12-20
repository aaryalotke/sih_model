import React from "react";
import "./index.css";
import { AppWrapper } from "./AppWrapper";
import { Chat } from "./Chat";
import Auth from "./Auth";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import NGOCard from "./NGOCard";

const cookies = new Cookies();

const ChatsPage = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("MUMBAI");
  const [isInChat, setIsInChat] = useState(null);
  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="chat-select">
          <div className="ngo-list">
            {/* ////////////////////////////// */}
            <div
              style={{ width: "200px", margin: "30px" }}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  src="https://cdn.sanity.io/images/kts928pd/production/03c5e1f41a08f714c252b6763457b843f8b8bc31-731x731.png"
                  alt="FoodCart NGO Image"
                  className="mb-4 rounded-lg"
                  style={{ width: "100%" }}
                />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Nidan NGO
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Location : Mumbai
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Requirement : 20 plates
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Date : 18/12/23 
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Time : 2:00pm IST 
              </p>
              <button
                onClick={() => {
                  setIsInChat(true);
                }}
                style={{
                  background: "#E2703A",
                  color: "white",
                  height: "30px",
                }}
                type="submit"
                className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Chat with us
              </button>
            </div>

            {/* ////////////////////////////// */}
            {/* ////////////////////////////// */}
            <div
              style={{ width: "200px", margin: "30px" }}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  src="https://content.wepik.com/statics/27145568/preview-page8.jpg"
                  alt="FoodCart NGO Image"
                  className="mb-4 rounded-lg"
                  style={{ width: "100%" }}
                />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Prayas NGO
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Location : Rajam
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Requirement : 40 plates
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Date : 17/12/23 
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Time : 8:00pm IST 
              </p>
              <button
                onClick={() => {
                
                }}
                style={{
                  background: "#E2703A",
                  color: "white",
                  height: "30px",
                }}
                type="submit"
                className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Chat with us
              </button>
            </div>
            {/* ////////////////////////////// */}
            {/* ////////////////////////////// */}
            <div
              style={{ width: "200px", margin: "30px" }}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  src="https://cdn.sanity.io/images/kts928pd/production/03c5e1f41a08f714c252b6763457b843f8b8bc31-731x731.png"
                  alt="FoodCart NGO Image"
                  className="mb-4 rounded-lg"
                  style={{ width: "100%" }}
                />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Nidan NGO
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Location : Mumbai
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Requirement : 20 plates
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Date : 18/12/23 
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Time : 2:00pm IST 
              </p>
              <button
                onClick={() => {
                
                }}
                style={{
                  background: "#E2703A",
                  color: "white",
                  height: "30px",
                }}
                type="submit"
                className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Chat with us
              </button>
            </div>

            {/* ////////////////////////////// */}
            {/* ////////////////////////////// */}
            <div
              style={{ width: "200px", margin: "30px" }}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  src="https://content.wepik.com/statics/27145568/preview-page8.jpg"
                  alt="FoodCart NGO Image"
                  className="mb-4 rounded-lg"
                  style={{ width: "100%" }}
                />
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Prayas NGO
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Location : Rajam
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Requirement : 40 plates
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Date : 17/12/23 
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Time : 8:00pm IST 
              </p>
              <button
                onClick={() => {
            
                }}
                style={{
                  background: "#E2703A",
                  color: "white",
                  height: "30px",
                }}
                type="submit"
                className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Chat with us
              </button>
            </div>
            {/* ////////////////////////////// */}
          </div>
          <div className="room">
            {/* <label> Type room name: </label> */}
            {/* <input onChange={(e) => setRoom(e.target.value)} />
            <button
              onClick={() => {
                setIsInChat(true);
              }}
            >
              Enter Chat
            </button> */}
          </div>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
};

export default ChatsPage;
