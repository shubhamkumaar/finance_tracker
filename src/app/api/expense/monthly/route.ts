import { Expense } from "@/models/expenseModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

await connect();
export const GET = async (req: NextRequest) => {
  try {
    // Extract year and month from the request URL
    const { searchParams } = new URL(req.url);
    const year = parseInt(searchParams.get("year") || "");
    const month = parseInt(searchParams.get("month") || "");
    console.log(year, month);
    if (isNaN(year) || isNaN(month)) {
      return NextResponse.json({
        message: "Invalid year or month",
        success: false,
      }, { status: 400 });
    }

    // Fetch expenses for the given year and month
    const totalExpense = await Expense.aggregate([
      {
        $addFields: {
          expenseYear: { $year: "$date" },
          expenseMonth: { $month: "$date" },
        },
      },
      {
        $match: {
          expenseYear: year,
          expenseMonth: month,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmount: 1,
        },
      },
    ]);

    return NextResponse.json({
      message: "Expense fetched successfully",
      success: true,
      data: totalExpense.length ? totalExpense[0] : { totalAmount: 0 },
    });
  } catch (error) {
    console.error("Error fetching total expense:", error);
    return NextResponse.json({
      message: "Failed to fetch total expense",
      success: false,
    }, { status: 500 });
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

