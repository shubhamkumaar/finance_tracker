import { DateTimePicker } from "@/components/time-date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

type Expense = {
  type: string;
  amount: number;
  description: string;
  date: Date;
};

export function EditExpense({
  expense,
  onClick,
  loading,
  openEditDialog,
  setExpense,
  closeEditDialog,
}: {
  expense: Expense;
  onClick: () => void;
  setExpense: (expense: Expense) => void;
  loading: boolean;
  openEditDialog: boolean;
  closeEditDialog: () => void;
}) {
  return (
    <Dialog open={openEditDialog} onOpenChange={closeEditDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>You can your new expense here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type :
            </Label>
            <Select
              value={expense.type}
              onValueChange={(value) => {
                setExpense({ ...expense, type: value });
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Expense Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount :
            </Label>
            <Input
              value={expense.amount}
              id="amount"
              type="number"
              onChange={(e) => {
                setExpense({ ...expense, amount: Number(e.target.value) });
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description :
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Evening chai and samosa"
              className="col-span-3"
              value={expense.description}
              onChange={(e) => {
                setExpense({ ...expense, description: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date :
            </Label>
            <DateTimePicker
              onChange={(date: Date | null) => {
                if (date) {
                  setExpense({ ...expense, date });
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClick} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Processing" : "Edit Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
