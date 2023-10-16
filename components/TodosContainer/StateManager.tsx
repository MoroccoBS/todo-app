"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { Todo as TodoType, User } from "@prisma/client";
import DeleteModal from "../DeleteModal";
import { useState } from "react";

interface StateManagerProps {
  activeTodos: "LISTOFTODOS" | "COMPLETED" | "INCOMPLETE";
  setActiveTodos: React.Dispatch<
    React.SetStateAction<"LISTOFTODOS" | "COMPLETED" | "INCOMPLETE">
  >;
  numberOfTodos: number;
  setListOfTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  user: User | undefined | null;
}
export default function StateManager({
  activeTodos,
  setActiveTodos,
  numberOfTodos,
  setListOfTodos,
  user,
}: StateManagerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-mainColor px-6 py-4 flex justify-between z-40 mt-9 manager-shadow">
      <h1 className="text-foreground/30 w-full">{numberOfTodos} Items Left</h1>
      <div className="flex gap-4 items-center w-full">
        <h1
          className={`text-foreground/30 hover:text-foreground cursor-pointer transition-all duration-300 ${
            activeTodos === "LISTOFTODOS" &&
            "text-sky-600 hover:text-sky-600 font-bold"
          }`}
          onClick={() => setActiveTodos("LISTOFTODOS")}
        >
          All
        </h1>
        <h1
          className={`text-foreground/30 hover:text-foreground cursor-pointer transition-all duration-300 ${
            activeTodos === "INCOMPLETE" &&
            "text-sky-600 hover:text-sky-600 font-bold"
          }`}
          onClick={() => setActiveTodos("INCOMPLETE")}
        >
          Active
        </h1>
        <h1
          className={`text-foreground/30 hover:text-foreground cursor-pointer transition-all duration-300 ${
            activeTodos === "COMPLETED" &&
            "text-sky-600 hover:text-sky-600 font-bold"
          }`}
          onClick={() => setActiveTodos("COMPLETED")}
        >
          Completed
        </h1>
      </div>
      <h1
        className="text-foreground/30 hover:text-foreground cursor-pointer transition-all duration-300 w-full text-right"
        onClick={() => setOpen(true)}
      >
        Clear Completed
      </h1>
      <DeleteModal
        isOpen={open}
        setIsOpen={setOpen}
        setListOfTodos={setListOfTodos}
        user={user}
      />
    </div>
  );
}
