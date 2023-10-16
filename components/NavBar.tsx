import dynamic from "next/dynamic";
import Logo from "./Logo";
import { Skeleton } from "./ui/skeleton";
import Profile from "./Profile";
const ThemeSwitch = dynamic(() => import("./ThemeSwitch"), {
  ssr: false,
  loading: () => (
    <Skeleton className="ml-auto w-8 h-8 aspect-square rounded-full overflow-hidden relative" />
  ),
});
import { User, Todo as TodoType } from "@prisma/client";

interface NavBarProps {
  setListOfTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  user: User | undefined | null;
}

export default function NavBar({ setListOfTodos, user }: NavBarProps) {
  return (
    <div className={`w-full py-5 flex items-center text-white gap-4 pr-2`}>
      <Logo />
      <ThemeSwitch />
      <Profile image={user?.image} setListOfTodos={setListOfTodos} />
      {/* {session ? (
        <Profile />
      ) : (
        <Button
          onClick={() => Open(true)}
          className="text-xl"
          variant="flat"
          color="default"
        >
          LogIn
        </Button>
      )} */}
    </div>
  );
}
