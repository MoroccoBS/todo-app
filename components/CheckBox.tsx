import { AiOutlineCheck } from "react-icons/ai";
import { Plus } from "lucide-react";

interface CheckBoxProps {
  checked?: boolean;
  size?: number | string;
  onClick?: () => void;
  className?: string;
  isAdd?: boolean;
}

export default function CheckBox({
  checked,
  size,
  onClick,
  className,
  isAdd,
}: CheckBoxProps) {
  return (
    <div
      className={`w-7 cursor-pointer aspect-square rounded-full ${
        checked ? "bg-CheckBg" : "outline outline-1 outline-completed"
      } hover:outline-brightBlue transition-all flex overflow-hidden m-auto ${className} ${
        isAdd && "shadow-xl w-8 outline-none"
      }`}
      onClick={onClick}
    >
      {checked && !isAdd && (
        <div className="w-full h-full bg-CheckBackground flex">
          <AiOutlineCheck className={`m-auto stroke-2`} size={size} />
        </div>
      )}
      {isAdd && (
        <div className="w-full h-full bg-CheckBackground flex group">
          <Plus
            className={`m-auto stroke-2 group-hover:opacity-100 opacity-60 transition-all`}
            size={size}
          />
        </div>
      )}
    </div>
  );
}
