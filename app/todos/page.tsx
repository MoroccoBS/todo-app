import BackGround from "@/components/BackGround";
import { User } from "@prisma/client";
import getUser from "../api/actions/getUser";
import getTodos from "../api/actions/getTodos";
import TodosContainer from "@/components/TodosContainer/TodosContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";

const getData = async () => {
  const todos = await fetch("/api/getTodos");
  if (!todos.ok) {
    throw new Error("Failed to fetch data");
  }
  return todos;
};

export default async function Home() {
  // const user = await getUser();
  // console.log(todos);
  // const session = await getServerSession(authOptions);
  const todos = await getData();
  console.log(todos);
  return (
    <>
      <BackGround />
      <main className="w-11/12 max-w-xl h-full max-h-full py-16 m-auto flex flex-col z-10 relative overflow-hidden">
        <TodosContainer todos={[]} />
      </main>
    </>
  );
}
