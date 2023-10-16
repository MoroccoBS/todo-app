import { AiOutlineCheck } from "react-icons/ai";

interface CheckBoxProps {
  checked?: boolean;
  size?: number | string;
  onClick?: () => void;
  className?: string;
}

export default function CheckBox({
  checked,
  size,
  onClick,
  className,
}: CheckBoxProps) {
  const width = size ? `w-${size}` : "w-6";
  return (
    <div
      className={`w-7 cursor-pointer aspect-square rounded-full ${
        checked ? "bg-CheckBg" : "outline outline-1 outline-completed"
      } hover:outline-brightBlue transition-all flex overflow-hidden m-auto ${className}`}
      onClick={onClick}
    >
      {checked && (
        <div className="w-full h-full bg-CheckBackground flex">
          <AiOutlineCheck className={`m-auto stroke-2`} size={size} />
        </div>
      )}
    </div>
  );
}
