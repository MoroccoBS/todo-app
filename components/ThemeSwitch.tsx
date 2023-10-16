"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleColorScheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };
  const variants = {
    initial: {
      opacity: 0,
      x: "-100%",
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: "100%",
    },
  };
  return (
    <div
      className="ml-auto w-8 h-8 aspect-square rounded-full overflow-hidden relative cursor-pointer"
      onClick={handleColorScheme}
    >
      {resolvedTheme === "light" && (
        <motion.button
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          className={`w-full h-full absolute top-0 left-0`}
          variants={variants}
        >
          <FiSun size={25} />
        </motion.button>
      )}
      {resolvedTheme === "dark" && (
        <motion.button
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          variants={variants}
          className={`w-full h-full absolute top-0 left-0`}
        >
          <FiMoon size={25} />
        </motion.button>
      )}
    </div>
  );
}
