import dynamic from "next/dynamic";
import Logo from "./Logo";
const ThemeSwitch = dynamic(() => import("./ThemeSwitch"), {
  ssr: false,
  loading: () => <></>,
});
// interface NavBarProps {
//   session: Session | null;
//   Open: React.Dispatch<React.SetStateAction<boolean>>;
// }

export default function NavBar() {
  return (
    <div className={`w-full py-5 flex items-center text-white gap-4`}>
      <Logo />
      <ThemeSwitch />
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
