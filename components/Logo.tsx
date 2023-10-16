interface LogoProps {
  size?: string | number;
}

import { cn } from "@/lib/utils";

export default function Logo({ size }: LogoProps) {
  return (
    <h1 className={cn("text-5xl tracking-[0.5rem] font-bold", size)}>TODO</h1>
  );
}
