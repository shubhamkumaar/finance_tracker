"use client";
import { ColumnDef } from "@tanstack/react-table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  _id: string;
  type: string;
  amount: number;
  description: string;
  date: Date;
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "type",
    header: () => <div className="">Type</div>,
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <div className="font-medium">
          {String(type).charAt(0).toUpperCase() + String(type).slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: () => <div className="">Date</div>,
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return (
        <div className="font-medium">{new Date(date).toLocaleString()}</div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const expense = row.original;
  //     // console.log(expense);

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(expense._id)}
  //           ></DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
