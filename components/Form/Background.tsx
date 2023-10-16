"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
export default function Background() {
  const { resolvedTheme } = useTheme();
  return (
    <div className={`absolute w-full h-full object-cover top-0 left-0`}>
      <div className="bg-background w-full h-full absolute top-0 left-0 z-10 opacity-50 backdrop-blur-3xl "></div>
      <Image
        src="/images/gradient.jpg"
        fill
        alt="bg"
        className="object-cover z-0"
      />
    </div>
  );
}
