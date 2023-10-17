"use client";

import { useState, useMemo } from "react";
import Input from "./Input";
import Todos from "./Todos";
import { User, Todo as TodoType } from "@prisma/client";
import StateManager from "./StateManager";
import NavBar from "../NavBar";
import { useSession } from "next-auth/react";
import axios from "axios";

interface TodosContainerProps {
  todos: TodoType[] | undefined | null;
}

export default function TodosContainer({ todos }: TodosContainerProps) {
  const [listOfTodos, setListOfTodos] = useState<TodoType[]>(
    (todos &&
      todos.sort(
        (a, b) => ((a.position as number) - (b?.position as number)) as number
      )) ||
      []
  );
  const session = useSession();
  console.log(session);

  const todoss = axios.get("/api/getTodos");

  const [activeTodos, setActiveTodos] = useState<
    "LISTOFTODOS" | "COMPLETED" | "INCOMPLETE"
  >("LISTOFTODOS");

  const completedTodos = useMemo(() => {
    return listOfTodos.filter((todo) => todo.completed);
  }, [listOfTodos]);

  const incompleteTodos = useMemo(() => {
    return listOfTodos.filter((todo) => !todo.completed);
  }, [listOfTodos]);
  return (
    <>
      <NavBar setListOfTodos={setListOfTodos} />
      <div className="w-full h-full flex flex-col mt-10 relative">
        <Input setListOfTodos={setListOfTodos} todos={listOfTodos} />
        <Todos
          setListOfTodos={setListOfTodos}
          listOfTodos={
            activeTodos === "LISTOFTODOS"
              ? listOfTodos
              : activeTodos === "COMPLETED"
              ? completedTodos
              : incompleteTodos
          }
        />
        <StateManager
          activeTodos={activeTodos}
          setActiveTodos={setActiveTodos}
          setListOfTodos={setListOfTodos}
          numberOfTodos={incompleteTodos.length}
        />
      </div>
    </>
  );
}
