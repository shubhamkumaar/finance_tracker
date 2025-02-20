"use client";
import axios from "axios";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AddExpense } from "@/components/addExpense";
import { columns } from "../../components/column";
import { DataTable } from "../../components/data-table";
import { EditDeleteDialog } from "./edit-delete-dialog";
import { EditExpense } from "@/app/expense/editExpense";
import { PieChartz } from "@/components/pie-chart";

const data = [
  {
    name: "January",
    expense: 0,
  },
  {
    name: "February",
    expense: 0,
  },
  {
    name: "March",
    expense: 0,
  },
  {
    name: "April",
    expense: 0,
  },
  {
    name: "May",
    expense: 0,
  },
  {
    name: "June",
    expense: 0,
  },
  {
    name: "July",
    expense: 0,
  },
  {
    name: "August",
    expense: 0,
  },
  {
    name: "September",
    expense: 0,
  },
  {
    name: "October",
    expense: 0,
  },
  {
    name: "November",
    expense: 0,
  },
  {
    name: "December",
    expense: 0,
  },
];
const pieData: { name: string; value: number }[] = [];

function addPieData(expenses: any) {
  pieData.length = 0;
  expenses.forEach((expense: any) => {
    if (pieData.find((data) => data.name === expense.type)) {
      const index = pieData.findIndex((data) => data.name === expense.type);
      pieData[index].value += expense.amount;
    } else {
      pieData.push({ name: expense.type, value: expense.amount });
    }
  });
  // console.log("Pie Data", pieData);
}

function addAmount(expenses: any) {
  for (let i = 0; i < expenses.length; i++) {
    const date = new Date(expenses[i].date);
    const month = date.getMonth();
    data[month].expense += expenses[i].amount;
  }
}

export default function Expense() {
  const [editDeleteDialogOpen, setEditDeleteDialogOpen] = React.useState(false);
  const [expense, setExpense] = React.useState<{
    _id:string
    type: string,
    amount: number,
    description: string,
    date: Date,
  }>();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [expenses, setExpenses] = React.useState<
    {
      _id: string;
      type: string;
      amount: number;
      description: string;
      date: Date;
    }[]
  >([]);
  const [openEditExpense, setOpenEditExpense] = React.useState(false);
  const [id, setId] = React.useState("");
  async function handleExpenseRowClick(_id: string) {
    console.log("Row clicked", _id);
    setId(_id);
    setEditDeleteDialogOpen(true);
    const foundExpense = await expenses.find((expense) => expense._id === _id);
    if (foundExpense) {
      setExpense(foundExpense);
      console.log("Expense found", foundExpense);
    } else {
      console.error("Expense not found");
    }
  }

  const editExpense = async () => {
    if(!expense){
      toast.error("Expense cannot be empty");
      throw new Error("Expense cannot be empty");
    }
    if(expense.type === ""){
      toast.error("Type cannot be empty");
      throw new Error("Type cannot be empty");
    }
    if (!expense.amount) {
      toast.error("Amount cannot be empty");
      throw new Error("Amount cannot be empty");
    }
    if (expense.amount === 0) {
      toast.error("Amount cannot be 0");
      throw new Error("Amount cannot be 0");
    }
    if (expense.amount < 0) {
      toast.error("Amount cannot be negative");
      throw new Error("Amount cannot be negative");
    }

    try {
      setLoading(true);
      console.log("Edit Expense", expense);
      const res = await axios.patch(`/api/expense`, { ...expense, id });
      console.log("Patch", res.data);
      toast.success("Expense Updated Successfully");
      setExpenses((expenses) => {
        const index = expenses.findIndex((expense) => expense._id === id);
        if (index !== -1) {
          console.log("Index", expenses[index]);
          console.log("Data", res.data.data);         
          
          expenses[index] = res.data.data;
        }
        return expenses;
      });
    } catch (error: any) {
      console.log("Edit Expense Error", error.message);
    } finally {
      setLoading(false);
      setOpenEditExpense(false);
    }
  };

  const deleteExpense = async () => {
    console.log("Delete Expense");
    try {
      const res = await axios.delete(`/api/expense`, { data: { id } });
      toast.success("Expense Deleted Successfully");
      setExpenses((prev) => {
        return prev.filter((expense) => expense._id !== id);
      });
      // console.log("Delete Expense Success", res.data);
    } catch (error: any) {
      console.log("Delete Expense Error", error.message);
    } finally {
      setEditDeleteDialogOpen(false);
    }
  };

  const addExpense = async () => {
    if(!expense){
      toast.error("Expense cannot be empty");
      throw new Error("Expense cannot be empty");
    }
    if (expense.type === "") {
      toast.error("Type cannot be empty");
      throw new Error("Type cannot be empty");
    }
    if (!expense.amount) {
      toast.error("Amount cannot be empty");
      throw new Error("Amount cannot be empty");
    }
    if (expense.amount === 0) {
      toast.error("Amount cannot be 0");
      throw new Error("Amount cannot be 0");
    }
    if (expense.amount < 0) {
      toast.error("Amount cannot be negative");
      throw new Error("Amount cannot be negative");
    }

    try {
      setLoading(true);
      console.log("Add Expense", expense);      
      const res = await axios.post("/api/expense", expense);
      toast.success("Expense added successfully");
      router.push("/expense");
    } catch (error: any) {
      console.log("Add Expense Error", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getExpenses = async () => {
    try {
      const res = await axios.get("/api/expense");
      // console.log("Get Expenses success", res.data);
      setExpenses(res.data.data);
    } catch (error: any) {
      console.log("Get Expenses Error", error.message);
    }
  };


  React.useEffect(() => {
    getExpenses();
  }, []);

  React.useEffect(() => {
    if (expenses.length > 0) {
      addAmount(expenses);
      addPieData(expenses);
    }
  }, [expenses]);
  return (
    <div>
      <div className="flex justify-end mt-8">
        <AddExpense
          onClick={addExpense}
          onChange={(expense) => setExpense(expense)}
          loading={loading}
        />
      </div>
      <EditExpense
        expense={expense}
        loading={loading}
        onClick={editExpense}
        openEditDialog={openEditExpense}
        setExpense={setExpense}
        closeEditDialog={() => setOpenEditExpense(false)}
      />
      <div className="flex mt-8">
        <div className="w-[100%] h-96">
          <h1 className="text-2xl font-bold text-center">
            Month Wise Expenses
          </h1>
          {expenses.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={900}
                height={400}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="expense"
                  fill="#8884d8"
                  activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <div className="w-[33%]">
          <h1 className="text-2xl font-bold text-center">
            Category Wise Expenses
          </h1>
          {/* <div className="flex justify-center items-center shadow-md border border-gray-200 m-4 p-4 w-[50%]">
                    <div className="flex justify-center items-center">
                      <PieChartz data={pieData} />
                    </div>
                  </div> */}
          <div className="flex justify-center items-center shadow-md border border-gray-200 m-4 p-4 w-full rounded-xl">
            <div className="flex justify-center items-center">

            {expenses.length > 0 && <PieChartz data={pieData} />}
            </div>
          </div>
        </div>
        
      </div>
      <div className="mx-auto w-[80%]">
          <h1 className="text-2xl text-center">All Expenses</h1>
          <DataTable
            columns={columns}
            data={expenses}
            handleExpenseRowClick={handleExpenseRowClick}
          />
        </div>
      <Toaster />
      <EditDeleteDialog
        edit={() => {
          setOpenEditExpense(true);
          setEditDeleteDialogOpen(false);
        }}
        Delete={deleteExpense}
        editDeleteDialogOpen={editDeleteDialogOpen}
        setEditDeleteDialogOpen={setEditDeleteDialogOpen}
      />
    </div>
  );
}

