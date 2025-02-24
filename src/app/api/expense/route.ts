import { connect } from "@/dbConfig/dbConfig";
import { Expense } from "@/models/expenseModel";
import { NextRequest, NextResponse } from "next/server";
await connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { type, amount, description, date } = reqBody;
    console.log(reqBody);
    const newExpense = new Expense({
      type,
      amount,
      description,
      date,
    });
    const savedExpense = await newExpense.save();
    console.log(savedExpense);
    return NextResponse.json({
      message: "Expense added successfully",
      success: true,
      data: savedExpense,
    });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const expenses = await Expense.find({});
    return NextResponse.json({
      success: true,
      data: expenses,
    });
  } catch (error:any ) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { id, type, amount, description, date } = reqBody;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        type,
        amount,
        description,
        date,
      },
      { new: true }
    );
    return NextResponse.json({
      message: "Expense updated successfully",
      success: true,
      data: updatedExpense,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    return NextResponse.json({
      message: "Expense deleted successfully",
      success: true,
      data: deletedExpense,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
