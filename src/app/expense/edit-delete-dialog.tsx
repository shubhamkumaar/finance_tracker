import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

export function EditDeleteDialog({
  editDeleteDialogOpen,
  setEditDeleteDialogOpen,
  edit,
  Delete,
}: {
  editDeleteDialogOpen: boolean;
  edit: () => void;
  Delete: () => void;
  setEditDeleteDialogOpen: (open: boolean) => void;
}) {
  return (
    <AlertDialog open={editDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setEditDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={edit}>Edit</AlertDialogAction>
          <AlertDialogAction onClick={Delete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
