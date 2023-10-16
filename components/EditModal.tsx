"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { Todo } from "@prisma/client";
import { Button } from "./ui/button";
import { useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo: Todo | undefined | null;
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function EditModal({
  isOpen,
  setIsOpen,
  todo,
  setTodos,
}: EditModalProps) {
  const [value, setValue] = useState(todo?.content || "");
  const [error, setError] = useState(false);
  const handleEditTodo = async () => {
    if (!value) {
      setError(true);
      return;
    }
    try {
      await toast.promise(
        axios
          .put("/api/editTodo", {
            todoId: todo?.id,
            content: value,
          })
          .then((res) => {
            res.statusText === "OK" && setIsOpen(false);
            res.statusText === "OK" &&
              setTodos?.((prev) =>
                prev.map((prevTodo) =>
                  prevTodo.id === res.data.id ? res.data : prevTodo
                )
              );
          }),
        {
          loading: "Editing...",
          success: "Edited",
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
        <AlertDialogHeader className="flex flex-col gap-4">
          <AlertDialogTitle className="text-2xl text-center">
            Edit Todo
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Edit Todo"
              className={`w-full text-lg text-foreground bg-mainColor transition-all ${
                error ? "outline-red-500 outline" : ""
              }`}
              onFocus={() => {
                setError(false);
              }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-lg bg-mainColor hover:bg-bodyBg">
            Cancel
          </AlertDialogCancel>
          <Button className="text-lg" onClick={handleEditTodo}>
            Edit
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
