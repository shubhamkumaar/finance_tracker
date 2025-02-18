"use client";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AddExpense } from "@/components/addExpense";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { EditDeleteDialog } from "./edit-delete-dialog";

function Expense() {
  const [id, setId] = React.useState("");
  const [editDeleteDialogOpen, setEditDeleteDialogOpen] = React.useState(false);
  const [expense, setExpense] = React.useState({
    type: "others",
    amount: 0,
    description: "",
    date: new Date(),
  });

  function handleExpenseRowClick(_id: string) {
    console.log("Row clicked", _id);
    setEditDeleteDialogOpen(true);
    setId(_id);
  }
  const editExpense = async () => {
    console.log("Edit Expense");

    try {
    } catch (error: any) {
      console.log("Edit Expense Error", error.message);
    } finally {
      setEditDeleteDialogOpen(false);
    }
  };
  const deleteExpense = async () => {
    console.log("Delete Expense");
    try {
      const res = await axios.delete(`/api/expense`, { data: { id } });
      toast.success("Expense Deleted Successfully");
      console.log("Delete Expense Success", res.data);
    } catch (error: any) {
      console.log("Delete Expense Error", error.message);
    } finally {
      setEditDeleteDialogOpen(false);
    }
  };
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const addExpense = async () => {
    try {
      setLoading(true);
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

  const [expenses, setExpenses] = React.useState([]);
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

  return (
    <div>
      <AddExpense
        onClick={addExpense}
        onChange={(expense) => setExpense(expense)}
        loading={loading}
      />
      <DataTable
        columns={columns}
        data={expenses}
        handleExpenseRowClick={handleExpenseRowClick}
      />
      <Toaster />
      <EditDeleteDialog
        edit={editExpense}
        Delete={deleteExpense}
        editDeleteDialogOpen={editDeleteDialogOpen}
        setEditDeleteDialogOpen={setEditDeleteDialogOpen}
      />
    </div>
  );
}

export default Expense;
