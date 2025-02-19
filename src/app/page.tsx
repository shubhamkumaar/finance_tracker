"use client";
import React from "react";
import axios from "axios";
export default function Home() {

  async function getTotalExpense(year: number, month: number) {
    console.log("getTotalExpense Function start");
    try {
      const res = await axios.get(`/api/expense/monthly`, {
        params: {
          year: year,
          month: month,
        },
      });
      console.log("Monthly Total", res.data);
    } catch (e: any) {
      console.error("Error fetching monthly expenses:", e);
    }
  }

  const getMonthlyExpense = async () => {
    try {
      const res = await axios.post("/api/expense/monthly", {
        year: 2025,
        month: 2,
      });
      console.log("Get Monthly Expense",res.data);
    } catch (e: any) {
      console.error("Error fetching monthly expenses:", e);
    }
  };
  const getOverallExpense = async () => {
    try {
      const res = await axios.get("/api/expense/overall");
      console.log("Overall", res.data);
    } catch (e: any) {
      console.error("Error fetching overall expenses:", e);
    }
  };

  React.useEffect(() => {
    getMonthlyExpense();
    getTotalExpense(2025, 2);
    getOverallExpense();
  }, []);
  return (
    <div className="container border-2 border-gray-200 m-4 w-full h-screen">
      
    </div>
  );
}
