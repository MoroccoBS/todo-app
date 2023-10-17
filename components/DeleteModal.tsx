import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import toast from "react-hot-toast";
import { Todo as TodoType, User } from "@prisma/client";
import { Button } from "./ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setListOfTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  user: User | undefined | null;
}

export default function DeleteModal({
  isOpen,
  setIsOpen,
  setListOfTodos,
  user,
}: DeleteModalProps) {
  const handleClearAll = async () => {
    try {
      await toast.promise(
        axios
          .delete("/api/clearAll", { data: { userId: user?.id } })
          .then(() =>
            setListOfTodos((prev) => prev.filter((todo) => !todo.completed))
          )
          .then(() => {
            setIsOpen(false);
          }),
        {
          loading: "Deleting...",
          success: "Deleted",
          error: (error) => {
            console.log(error);
            return "Something went wrong";
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-bodyBg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            completed todos on our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-lg bg-mainColor hover:bg-bodyBg">
            Cancel
          </AlertDialogCancel>
          <Button
            variant={"default"}
            className="text-lg hover:bg-destructive hover:text-destructive-foreground transition-all"
            onClick={handleClearAll}
          >
            Delete All
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
