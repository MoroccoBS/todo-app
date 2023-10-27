"use client";
import { Toaster } from "react-hot-toast";
export default function ToastContext() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          backgroundColor: "var(--MainColor)",
          color: "hsl(var(--foreground))",
        },
      }}
    />
  );
}
