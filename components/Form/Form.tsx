"use client";

import { useEffect, useState } from "react";
import Logo from "../Logo";
import Input from "./Input";
import { Button } from "../ui/button";
import { BsArrowLeft, BsGithub, BsGoogle } from "react-icons/bs";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import ThemeSwitch from "../ThemeSwitch";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Form() {
  const [variants, setVariants] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const formValidation = () => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    if (variants == "REGISTER") {
      if (!emailRegex.test(credentials.email)) {
        setErrors((prev) => ({ ...prev, email: "Invalid Email" }));
        isValid = false;
      }
      if (credentials.email == "") {
        setErrors((prev) => ({ ...prev, email: "This field is required" }));
        isValid = false;
      }
      if (credentials.password.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters",
        }));
        isValid = false;
      }
      if (credentials.password == "") {
        setErrors((prev) => ({
          ...prev,
          password: "This field is required",
        }));
        isValid = false;
      }
      if (credentials.name.length < 3) {
        setErrors((prev) => ({
          ...prev,
          name: "Name must be at least 3 characters",
        }));
        isValid = false;
      }
      if (credentials.name == "") {
        setErrors((prev) => ({ ...prev, name: "This field is required" }));
        isValid = false;
      }
    } else {
      if (credentials.email === "") {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter your email",
        }));
        isValid = false;
      }
      if (credentials.password === "") {
        setErrors((prev) => ({
          ...prev,
          password: "Please enter your password",
        }));
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSign = async () => {
    if (!formValidation()) {
      return;
    }
    setLoading(true);

    if (variants == "LOGIN") {
      let toastId = toast.loading("Logging in...");
      await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        callbackUrl: "/",
        redirect: false,
      })
        .then((res) => {
          res?.error
            ? toast.error(res.error, { id: toastId })
            : (toast.success("Logged in successfully", { id: toastId }),
              router.push("/todos"));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      try {
        await toast
          .promise(axios.post("/api/register", credentials), {
            loading: "Creating account...",
            success: "Account created successfully",
            error: (e) => {
              return e.response.data.error;
            },
          })
          .then(() => {
            signIn("credentials", credentials);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const socialLogin = async (provider: string) => {
    let toastId = toast.loading("Logging in...");
    await signIn(provider, {
      redirect: false,
    }).finally(() => {
      toast.dismiss(toastId);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/todos");
    }
  }, [session.status, router]);

  return (
    <motion.div
      layout
      transition={{ duration: 0.25, type: "spring" }}
      className="w-11/12 max-w-2xl h-max sm:p-10 px-6 py-10 flex flex-col gap-4 relative z-10 bg-background rounded-xl shadow-2xl"
    >
      <div className="mb-2 w-full justify-between items-center flex ">
        <Logo size="text-2xl" />
        <ThemeSwitch />
      </div>
      <h1 className="text-2xl font-extrabold my-4 md:text-3xl">
        {variants == "REGISTER"
          ? "Welcome to Todo, Register Now."
          : "Welcome back, Login."}
      </h1>
      <Input
        label="Email"
        placeholder="example@example.com"
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        isError={errors.email !== ""}
        error={errors.email}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        loading={loading}
      />
      {variants == "REGISTER" && (
        <Input
          label="Name"
          placeholder="John Doe"
          type="text"
          value={credentials.name}
          onChange={(e) =>
            setCredentials({ ...credentials, name: e.target.value })
          }
          isError={errors.name !== ""}
          error={errors.name}
          onFocus={() => {
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          loading={loading}
        />
      )}

      <Input
        label="Password"
        placeholder="Password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        isError={errors.password !== ""}
        error={errors.password}
        onFocus={() => {
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
        loading={loading}
      />
      <Button
        className={`text-lg group mt-2`}
        disabled={loading}
        onClick={handleSign}
      >
        {!loading ? (
          <>
            <h1 className="group-hover:-translate-x-1/4 transition-all">
              {variants == "LOGIN" ? "Login" : "Register"}
            </h1>
            <BsArrowLeft className="ml-2 rotate-180 opacity-0 group-hover:opacity-100 group-hover:translate-x-[150%] transition-all absolute" />
          </>
        ) : (
          <ImSpinner8 className="animate-spin" />
        )}
      </Button>
      <div className="w-full my-2 relative after:content-[''] after:z-0 after:absolute after:bottom-1/2 after:left-0 after:w-full after:h-[1px] after:bg-foreground/25">
        <h1 className="text-foreground/50 text-center z-10 relative bg-background w-max mx-auto px-2">
          Or continue with
        </h1>
      </div>
      <div className="flex items-center justify-center w-full gap-4 text-foreground/50">
        <Button
          variant="outline"
          className=" text-lg w-full"
          onClick={() => socialLogin("github")}
        >
          <BsGithub />
        </Button>
        <Button
          variant="outline"
          className=" text-lg w-full"
          onClick={() => socialLogin("google")}
        >
          <BsGoogle />
        </Button>
      </div>
      <p className="text-foreground/50 text-center mt-2">
        {variants == "LOGIN"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span
          className={`inline-block underline cursor-pointer hover:text-foreground transition-all ${
            loading ? "pointer-events-none cursor-wait" : "pointer-events-auto"
          }`}
          onClick={() => {
            setVariants(variants == "LOGIN" ? "REGISTER" : "LOGIN");
            setCredentials({ email: "", password: "", name: "" });
          }}
        >
          {variants == "LOGIN" ? "SingUp" : "SingIn"}
        </span>
      </p>
    </motion.div>
  );
}
