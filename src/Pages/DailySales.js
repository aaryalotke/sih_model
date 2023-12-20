import React, { useState, useEffect } from "react";
import DishList from "../Components/DishList";
import ProfitEstimator from "../Components/ProfitEstimator";
import Coupon from "../Components/Coupon";

const DailySales = () => {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [totalCostPrice, setTotalCostPrice] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const [fixedMonthlyCost, setFixedMonthlyCost] = useState(1000);
  const [profitPercentage, setProfitPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/read/"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSelectedDishes(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    const updatedDishes = [...selectedDishes];
    updatedDishes[index].isChecked = !updatedDishes[index].isChecked;
    setSelectedDishes(updatedDishes);
    console.log("Selected Dishes:", updatedDishes);
  };

  const handleQuantityChange = (index, quantity) => {
    setSelectedDishes((prevState) => {
      const updatedDishes = [...prevState];
      updatedDishes[index].quantity = quantity;
      return updatedDishes;
    });
  };

  const calculateCostPrice = () => {
    const CP = selectedDishes.reduce((total, dish) => {
      const quantity = parseFloat(dish.quantity);
      const costPrice = parseFloat(dish.cost_price); // Change to cost_price

      if (dish.isChecked && !isNaN(quantity) && !isNaN(costPrice)) {
        const dishTotal = quantity * costPrice;
        return total + dishTotal;
      }

      return total;
    }, 0);

    setTotalCostPrice(CP);
  };

  const calculateSellingPrice = () => {
    const SP = selectedDishes.reduce((total, dish) => {
      const quantity = parseFloat(dish.quantity);
      const sellingPrice = parseFloat(dish.selling_price); // Change to selling_price

      if (dish.isChecked && !isNaN(quantity) && !isNaN(sellingPrice)) {
        const dishTotal = quantity * sellingPrice;
        return total + dishTotal;
      }

      return total;
    }, 0);

    setTotalSellingPrice(SP);
  };

  const calculateProfit = () => {
    const profit = fixedMonthlyCost + totalSellingPrice - totalCostPrice;
    const pp = (profit / (fixedMonthlyCost + totalSellingPrice)) * 100;
    setProfitPercentage(pp.toFixed(2));
  };

  useEffect(() => {
    calculateCostPrice();
    calculateSellingPrice();
  }, [selectedDishes]);

  const [couponsData, setCouponsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/openai")
      .then((response) => response.json())
      .then((data) => setCouponsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <section
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div style={{ width: "55%" }}>
          {/* Dish List */}
          <DishList
            dishes={selectedDishes}
            selectedDishes={selectedDishes}
            handleQuantityChange={handleQuantityChange}
            handleCheckboxChange={handleCheckboxChange}
          />

          {/* Profit Estimator */}
          <ProfitEstimator
            totalCostPrice={totalCostPrice}
            totalSellingPrice={totalSellingPrice}
            calculateProfit={calculateProfit}
            fixedMonthlyCost={fixedMonthlyCost}
            profitPercentage={profitPercentage}
          />
        </div>
        <div style={{ width: "40%" }}>
          {couponsData.map((coupon, index) => (
            <Coupon
              key={index}
              dishName={coupon.dish_name}
              couponText={coupon.offer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DailySales;
