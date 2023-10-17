import Logo from "./Logo";
import { Skeleton } from "./ui/skeleton";
import Profile from "./Profile";
import ThemeSwitch from "./ThemeSwitch";
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
      <Profile user={user} setListOfTodos={setListOfTodos} />
    </div>
  );
}
