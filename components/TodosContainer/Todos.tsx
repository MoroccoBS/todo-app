"use client";
import Todo from "./Todo";
import { Reorder } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import getTodos from "@/app/api/actions/getTodos";
import { Todo as TodoType, User } from "@prisma/client";
import getUser from "@/app/api/actions/getUser";
import { useSession } from "next-auth/react";
import axios from "axios";
const ListOfTodos = [
  {
    id: 1,
    task: "This is a dummy Todo",
    is_complete: false,
    user_id: "1",
    inserted_at: new Date().toString(),
    position: 1,
  },
  {
    id: 2,
    task: "This is another dummy Todo How Amazing!!",
    is_complete: false,
    user_id: "1",
    inserted_at: new Date().toString(),
    position: 0,
  },
];
import { ScrollArea } from "../ui/scroll-area";

interface TodoProps {
  listOfTodos: TodoType[];
  setListOfTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function Todos({ listOfTodos, setListOfTodos }: TodoProps) {
  const handleReorder = async (newOrder: TodoType[]) => {
    setListOfTodos(newOrder);
    console.log(newOrder);
    for (let i = 0; i < newOrder.length; i++) {
      const todo = newOrder[i];
      console.log(todo.id);
      console.log(i);
      await axios
        .put("api/handleTodo", {
          todoId: todo.id,
          position: i,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  return (
    <>
      <Reorder.Group
        as="div"
        axis="y"
        values={listOfTodos ?? []}
        onReorder={handleReorder}
      >
        <div className="w-full rounded-md bg-mainColor max-h-96 h-max min-h-full mt-10 z-10 relative overflow-y-scroll">
          {listOfTodos &&
            listOfTodos?.map((todo, index) => (
              <Todo key={todo.id} todo={todo} setTodos={setListOfTodos} />
            ))}
          {listOfTodos.length === 0 && (
            <h1 className="text-foreground text-center m-auto translate-y-1/2 text-xl">
              No Todos
            </h1>
          )}
        </div>
      </Reorder.Group>
    </>
  );
}
