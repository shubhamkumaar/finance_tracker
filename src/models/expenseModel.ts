import mongoose, { Schema, model, models } from "mongoose";

const expenseSchema = new Schema({
  type: {
    type: String,
    default: "other",
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Check if model already exists before defining
export const Expense = models.Expense || model("Expense", expenseSchema);
