import { Expense } from "@/models/expenseModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

await connect();
export const GET = async () => {
  try {
    const totalExpense = await Expense.aggregate([
      {
        $group: {
          _id: null, // Group all documents
          totalAmount: { $sum: "$amount" }, // Sum total amount
        },
      },
      {
        $project: {
          _id: 0, // Remove default `_id`
          totalAmount: 1,
        },
      },
    ]);
    return NextResponse.json({
      message: "Expense updated successfully",
      success: true,
      data: totalExpense,
    });
  } catch (error) {
    console.error("Error fetching total expense:", error);
    throw new Error("Failed to fetch total expense");
  }
};