import React, { useState } from 'react';
import './Coupon.css';

const Coupon = () => {
  const [copyButtonText, setCopyButtonText] = useState("COPY");

  const copyIt = () => {
    const copyInput = document.querySelector("#copyvalue");
    copyInput.select();
    document.execCommand("copy");
    setCopyButtonText("COPIED");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="main">
          <div className="co-img">
            <img
              src="https://i.pinimg.com/originals/c7/84/67/c78467db9ff497393cb548a48f02d451.png"
              alt=""
            />
          </div>
          <div className="vertical"></div>
          <div className="content">
            <h2>Mcdonalds</h2>
            <h1>
              10% <span>Coupon</span>
            </h1>
            <p>Valid till 30 April 2021</p>
          </div>
        </div>
        <div className="copy-button">
          <input id="copyvalue" type="text" readOnly value="GOFREE" />
          <button onClick={copyIt} className="copybtn">
            {copyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupon;
