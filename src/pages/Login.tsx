import { use, useActionState } from "react";
import { Navigate } from "@tanstack/react-router";

import { login } from "../services/auth";
import { FormLoginType } from "../utils/types";
import LoginSVG from "../assets/images/login.svg?react";
import { showToast } from "../utils/showToast";
import { validateEmail } from "../utils/helpers";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/forms/LoginForm";

const initialState: FormLoginType = {
  email: "",
  password: "",
};

export default function Login() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { token, setToken, setUser } = context;

  const handleLoginAction = async (
    _prevState: FormLoginType,
    formData: FormData,
  ) => {
    const payload = Object.fromEntries(formData.entries());
    const email = payload?.email as string;
    const password = payload?.password as string;
    const submitType = (payload?.submitType as "submit" | "reset") || "submit";

    if (submitType === "reset") return initialState;

    try {
      if (!email || !password) {
        showToast("warning", "Please fill in all fields");
        return { email, password };
      }
      if (!validateEmail(email)) {
        showToast("error", "Invalid email format");
        return { email, password };
      }

      const user: FormLoginType = { email, password };
      const loggedUser = await login(user);
      setToken(loggedUser?.accessToken);
      setUser(loggedUser?.user);
      showToast("success", `Welcome back ${loggedUser?.user?.firstName}`);
      return { email: "", password: "" };
    } catch (error) {
      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials",
      );
      return { email, password };
    }
  };

  const [formState, formAction, isPending] = useActionState(
    handleLoginAction,
    initialState,
  );

  if (token) return <Navigate to="/" />;

  return (
    <div className="divide-secondary h-full w-full divide-x-2 py-20 lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <LoginSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <LoginForm
          formAction={formAction}
          formState={formState}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
