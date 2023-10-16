interface ActiveSelectorProps {
  isActive: boolean;
  onClick: () => void;
  type: string;
}

export default function ActiveSelector({
  isActive,
  onClick,
  type,
}: ActiveSelectorProps) {
  return (
    <h1
      className={`text-foreground/30 hover:text-foreground cursor-pointer transition-all duration-300 ${
        isActive && "text-sky-600 hover:text-sky-600 font-bold"
      }`}
      onClick={onClick}
    >
      {type}
    </h1>
  );
}
