import { Todo as TodoType, User } from "@prisma/client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface ProfileProps {
  setListOfTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  user: User | undefined | null;
}

export default function Profile({ setListOfTodos, user }: ProfileProps) {
  const handleLogOut = async () => {
    try {
      await toast.promise(
        signOut().then(() => {
          setListOfTodos([]);
        }),
        {
          loading: "Signing out...",
          success: "Signed out successfully",
          error: (e) => {
            console.log(e);
            return "Something went wrong...";
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-12 aspect-square rounded-full overflow-hidden relative cursor-pointer shadow-lg hover:scale-105 transition-all">
        <Image
          src={user?.image || "/41.png"}
          alt="AvatarFallback"
          fill
          className="object-cover w-full h-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-mainColor text-md p-2 px-3 flex flex-col gap-2">
        <h1 className="">Hi, {user?.name}</h1>
        <DropdownMenuSeparator className="bg-TodoBorder" />
        <Button className="bg-mainColor text-foreground hover:bg-foreground hover:text-mainColor">
          Profile
        </Button>
        <Button className="bg-mainColor text-foreground hover:bg-foreground hover:text-mainColor">
          Settings
        </Button>
        <Button
          className="bg-mainColor text-foreground hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
