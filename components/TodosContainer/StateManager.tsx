"use client";

import { Todo as TodoType, User } from "@prisma/client";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import ActiveSelector from "./ActiveSelector";

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
    <div className="w-full bg-mainColor px-6 py-4 flex justify-between z-40 manager-shadow relative">
      <h1 className="text-foreground/30 sm:w-full">
        {numberOfTodos} Items Left
      </h1>
      <div className="sm:flex gap-4 items-center w-full hidden">
        <ActiveSelector
          type="All"
          isActive={activeTodos === "LISTOFTODOS"}
          onClick={() => setActiveTodos("LISTOFTODOS")}
        />
        <ActiveSelector
          type="Active"
          isActive={activeTodos === "INCOMPLETE"}
          onClick={() => setActiveTodos("INCOMPLETE")}
        />
        <ActiveSelector
          type="Completed"
          isActive={activeTodos === "COMPLETED"}
          onClick={() => setActiveTodos("COMPLETED")}
        />
      </div>
      <h1
        className="text-foreground/30 hover:text-foreground cursor-pointer transition-all duration-300 sm:w-full text-right "
        onClick={() => setOpen(true)}
      >
        Clear Completed
      </h1>
      <div className="flex justify-center rounded-md gap-4 items-center w-full px-4 py-4 sm:hidden absolute top-full translate-y-1/2 bg-mainColor left-1/2 -translate-x-1/2">
        <ActiveSelector
          type="All"
          isActive={activeTodos === "LISTOFTODOS"}
          onClick={() => setActiveTodos("LISTOFTODOS")}
        />
        <ActiveSelector
          type="Active"
          isActive={activeTodos === "INCOMPLETE"}
          onClick={() => setActiveTodos("INCOMPLETE")}
        />
        <ActiveSelector
          type="Completed"
          isActive={activeTodos === "COMPLETED"}
          onClick={() => setActiveTodos("COMPLETED")}
        />
      </div>
      <DeleteModal
        isOpen={open}
        setIsOpen={setOpen}
        setListOfTodos={setListOfTodos}
        user={user}
      />
    </div>
  );
}
