import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface InputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isError?: boolean;
  label?: string;
  onFocus?: () => void;
  loading?: boolean;
}

export default function Input({
  placeholder,
  type,
  value,
  onChange,
  error,
  isError,
  label,
  onFocus,
  loading,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg">{label}</h1>
        {isError && error && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="text-red-500"
          >
            {error}
          </motion.div>
        )}
      </div>
      <input
        disabled={loading}
        className={`w-full px-6 py-[14px] outline outline-1 outline-foreground/20 rounded-md focus:outline-foreground/80 focus:outline-2 transition-all ${
          isError ? "outline-red-500/80 outline-2" : ""
        } disabled:cursor-wait`}
        placeholder={placeholder}
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      {type === "password" && value && (
        <div
          className="absolute right-12 top-1/2 text-3xl bg-red-600 opacity-50 hover:opacity-100 transition-all cursor-pointer select-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="absolute translate-y-[3px]" />
          ) : (
            <AiOutlineEye className="absolute translate-y-[3px]" />
          )}
        </div>
      )}
    </div>
  );
}
