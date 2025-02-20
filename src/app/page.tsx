"use client";
import React, { useState } from "react";
import axios from "axios";
import { useFloating, offset, flip, shift } from "@floating-ui/react";
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/month-year-picker";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/column";
import { get } from "http";
import { set } from "mongoose";
export default function Home() {
  const [totalMonthlyExpense, setTotalMonthlyExpense] = React.useState(0);

  async function getTotalExpense(year: number, month: number) {
    console.log("getTotalExpense Function start");
    try {
      const res = await axios.get(`/api/expense/monthly`, {
        params: {
          year: year,
          month: month,
        },
      });
      // console.log("Monthly Total", res.data.totalAmount);
      setTotalMonthlyExpense(res.data.data.totalAmount);
    } catch (e: any) {
      console.error("Error fetching monthly expenses:", e);
    }
  }
  const [monthlyExpense, setMonthlyExpense] = useState([]);

  const getMonthlyExpense = async (year: number, month: number) => {
    try {
      const res = await axios.post("/api/expense/monthly", {
        year: year,
        month: month,
      });

      setMonthlyExpense(res.data.data);
    } catch (e: any) {
      console.error("Error fetching monthly expenses:", e);
    }
  };

  const [recentExpense, setRecentExpense] = useState([]);
  const getRecentExpense = async () => {
    try {
      const res = await axios.get("/api/expense/overall");
      // console.log("Overall", res.data.data);
      setRecentExpense(res.data.data);
    } catch (e: any) {
      console.error("Error fetching overall expenses:", e);
    }
  };
  const [month, setMonth] = React.useState(new Date());
  React.useEffect(() => {
    getMonthlyExpense(new Date().getFullYear(), new Date().getMonth() + 1);
    getTotalExpense(new Date().getFullYear(), new Date().getMonth() + 1);
    getRecentExpense();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
  });
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div className="flex flex-col shadow-md border-1 border-gray-200 m-4 p-4 w-[20%] ">
          <h1 className="text-xl font-sans font-bold text-center my-4">
            {monthNames[month.getMonth()]} Month Summary
          </h1>
          <div className="px-4 mt-2">
            <div className="flex justify-between my-2">
              <h2 className="text-lg font-semibold mb-2">Total Expense </h2>
              <h2 className="text-lg font-semibold mb-2">
                {totalMonthlyExpense}
              </h2>
            </div>
            {monthlyExpense.length > 0 &&
              monthlyExpense.map((expense: any, index) => (
                <div key={index} className="flex justify-between my-2">
                  <p>
                    {String(expense.type[0]).toUpperCase() +
                      String(expense.type).slice(1)}
                  </p>
                  <p>{expense.totalAmount}</p>
                </div>
              ))}
          </div>
          <div className="flex justify-center">
            <Button ref={refs.setReference} onClick={() => setIsOpen(!isOpen)}>
              Change Month
            </Button>
            {isOpen && (
              <div
                className="flex flex-col items-center justify-center"
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                  zIndex: 1000,
                  backgroundColor: "white",
                  padding: "10px",
                }}
              >
                <MonthPicker
                  currentMonth={month}
                  onMonthChange={(date: Date) => {
                    setMonth(date);
                    getTotalExpense(date.getFullYear(), date.getMonth() + 1);
                    getMonthlyExpense(date.getFullYear(), date.getMonth() + 1);
                    console.log("Date", date);
                    setIsOpen(false);
                  }}
                />
                  <Button
                    variant={"outline"}
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
              </div>
            )}
          </div>
        </div>
        <div className="w-[60%]">
          <h1 className="text-2xl font-sans font-bold text-center">
            Recent Expenses
          </h1>
          <DataTable
            columns={columns}
            data={recentExpense}
            handleExpenseRowClick={(id: string) => {}}
          />
        </div>
      </div>
    </>
  );
}
