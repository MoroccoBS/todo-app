import BackGround from "@/components/BackGround";
import { User } from "@prisma/client";
import getUser from "../api/actions/getUser";
import getTodos from "../api/actions/getTodos";
import TodosContainer from "@/components/TodosContainer/TodosContainer";

export default async function Home() {
  const user = await getUser();
  const todos = await getTodos(user as User);
  return (
    <>
      <BackGround />
      <main className="w-11/12 max-w-xl h-full max-h-full py-16 m-auto flex flex-col z-10 relative overflow-hidden">
        <TodosContainer user={user} todos={todos} />
      </main>
    </>
  );
}
