"use client";
import { Toaster } from "react-hot-toast";
export default function ToastContext() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          backgroundColor: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        },
      }}
    />
  );
}
