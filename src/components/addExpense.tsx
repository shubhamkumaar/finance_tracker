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

type expense = {
  type: string;
  amount: number;
  description: string;
  date: Date;
};

export function AddExpense({
  onClick,
  onChange,
  loading,
}: {
  onClick: () => void;
  onChange: (expense: expense) => void;
  loading: boolean;
}) {
  const [expense, setExpense] = React.useState({
    type: "others",
    amount: 0,
    description: "",
    date: new Date(),
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-4 w-64 color=[#EE8F3E]">Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>You can your new expense here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type :
            </Label>
            <Select
              onValueChange={(value) => {
                setExpense({ ...expense, type: value });
                onChange({ ...expense, type: value });
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

            {/* <Input
              id="type"
              className="col-span-3"
              onChange={(e) => {
                setExpense({ ...expense, type: e.target.value });
              }}
            /> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount :
            </Label>
            <Input
              id="amount"
              type="number"
              onChange={(e) => {
                setExpense({ ...expense, amount: Number(e.target.value) });
                onChange({ ...expense, amount: Number(e.target.value) });
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
              onChange={(e) => {
                setExpense({ ...expense, description: e.target.value });
                onChange({ ...expense, description: e.target.value });
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date :
            </Label>
            <DateTimePicker
              onChange={(e: any) =>
                // setExpense({ ...expense, date: new Date(e.target.value) });
                onChange({ ...expense, date: new Date(e.target.value) })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClick} disabled={loading}>
            {loading ? "Processing" : "Add Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
