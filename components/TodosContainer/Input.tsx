"use client";
import { useRef, useState } from "react";
import CheckBox from "../CheckBox";
import toast from "react-hot-toast";
import axios from "axios";
import { User } from "@prisma/client";
import { Todo as TodoType } from "@prisma/client";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ToolTip from "./ToolTip";

interface InputProps {
  user: User | undefined | null;
  todos: TodoType[] | undefined | null;
  setListOfTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function Input({ user, setListOfTodos, todos }: InputProps) {
  const [error, setError] = useState(false);
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleAddTodo = async () => {
    if (!todo) {
      setError(true);
      clearTimeout(timeoutRef.current); // Clear the previous timeout
      timeoutRef.current = setTimeout(() => {
        setError(false);
      }, 1000);
      return;
    }
    const calculatePosition = Array.from(
      todos ? todos.map((todo) => todo.position) : []
    );
    const max =
      calculatePosition.length < 1
        ? 0
        : Math.max(...(calculatePosition as number[]));

    try {
      setLoading(true);
      await toast.promise(
        axios
          .post("/api/handleTodo", {
            todo,
            position: max + 1,
            userId: user?.id as string,
          })
          .then((res) => {
            console.log(res.data);
            setListOfTodos((prev) => [...prev, res.data]);
            setTodo("");
            setLoading(false);
          }),
        {
          loading: "Adding todo...",
          success: "Todo added successfully",
          error: "Something went wrong",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full p-5 rounded-md bg-mainColor flex items-center gap-6 transition-all duration-300 ${
        error && "outline outline-2 outline-red-500"
      }`}
    >
      <CheckBox
        onClick={() => handleAddTodo()}
        className="absolute"
        isAdd={true}
        checked={false}
      />
      <input
        className={`w-full h-full bg-transparent outline-none placeholder:text-Text/50 placeholder:text-base text-lg ml-12`}
        disabled={loading}
        type="text"
        placeholder={
          error ? "This field is required" : "What needs to be done?"
        }
        onFocus={() => {
          setError(false);
        }}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        value={todo}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
      />
      <ToolTip />
      {/* <Button
        className="rounded-full px-8 bg-foreground text-mainColor"
        onClick={handleAddTodo}
      >
        Add Todo
      </Button> */}
    </div>
  );
}
