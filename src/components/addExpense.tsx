import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "@/components/time-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Plus } from "lucide-react";
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
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


type expense = {
  _id:string,
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
    _id:"",
    type: "others",
    amount: 0,
    description: "",
    date: new Date(),
  });
  const [date, setDate] = React.useState<Date>()
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#ee8f3e] m-4 w-64">
          <Plus />
          Add Expense
        </Button>
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
            <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date: any) => {
                                  // setExpense({ ...expense, date:date});
                                  setDate(date);
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <div className="mt-4">
                          <TimePicker 
                            date={date}
                            setDate={(date: any) => {
                              setDate(date);
                              setExpense({ ...expense, date: date });
                            }}
                          />
                          </div>
                        </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onClick} disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Processing" : "Add Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
