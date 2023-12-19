import React, { useEffect, useState } from "react";
import GoogleTranslateWidget from "../../Components/GoogleTranslateWidget";

function ShowDish() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/dishes/alldishes")
      .then((res) => res.json())
      .then((data) => {
        setData(data.documents);
        console.log(data.documents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome To translation Website of Aaman!</h1>

      <p>
        You can choose any language from the dropdown to translate the website.
      </p>
      <GoogleTranslateWidget />
      {data.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Description: {item.description}</p>
          <p>Price: {item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ShowDish;
