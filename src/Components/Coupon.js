import React, { useState } from "react";
import "./Coupon.css";

const Coupon = ({ dishName, couponText }) => {
  const [copyButtonText, setCopyButtonText] = useState("COPY");

  const copyIt = () => {
    const copyInput = document.querySelector("#copyvalue");
    copyInput.select();
    document.execCommand("copy");
    setCopyButtonText("COPIED");
  };

  return (
    <div className="container">
      <div className="card-coup">
        <div className="main">
          <div className="co-img">
            <img
              src="https://img.freepik.com/premium-vector/flash-sale-background-flat-style_9583-151.jpg"
              alt=""
            />
          </div>
          <div className="vertical"></div>
          <div className="content">
            <h2>{dishName}</h2>
            <h1>
              {couponText}
            </h1>
          </div>
        </div>
        {/* <div className="copy-button">
          <input id="copyvalue" type="text" readOnly value={couponText} />
          <button onClick={copyIt} className="copybtn">
            {copyButtonText}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Coupon;
