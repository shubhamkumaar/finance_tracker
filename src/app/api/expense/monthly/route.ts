import { Expense } from "@/models/expenseModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

await connect();
export const GET = async (res: NextResponse) => {
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

export const POST = async (req: NextRequest) => {
    try {
      const body = await req.json(); // Extract request body
      const { month, year } = body;
  
      if (!month || !year) {
        return NextResponse.json(
          { message: "Month and Year are required", success: false },
          { status: 400 }
        );
      }
  
      // Construct start and end date based on input month and year
      const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
  
      const result = await Expense.aggregate([
        {
          $match: {
            date: { $gte: startOfMonth, $lte: endOfMonth },
          },
        },
        {
          $group: {
            _id: "$type",
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $project: {
            _id: 0,
            type: "$_id",
            totalAmount: 1,
          },
        },
      ]);
  
      return NextResponse.json({
        message: "Monthly expenses fetched successfully",
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching monthly type-wise expenses:", error);
      return NextResponse.json(
        { message: "Failed to fetch expenses", success: false, error },
        { status: 500 }
      );
    }
  };

// export const GET = async () => {
//   try {
//     const totalExpense = await Expense.aggregate([
//       {
//         $group: {
//           _id: null, // Group all documents
//           totalAmount: { $sum: "$amount" }, // Sum total amount
//         },
//       },
//       {
//         $project: {
//           _id: 0, // Remove default `_id`
//           totalAmount: 1,
//         },
//       },
//     ]);
//     return totalExpense[0].totalAmount;
//   } catch (error) {
//     console.error("Error fetching total expense:", error);
//     throw new Error("Failed to fetch total expense");
//   }
// };
