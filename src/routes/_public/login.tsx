import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContextType } from "../../context/AuthContext";
import { useActionState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FormLoginType } from "../../utils/types";
import useAuth from "../../hooks/useAuth";
import { showToast } from "../../utils/showToast";
import { validateEmail } from "../../utils/helpers";
import { login } from "../../services/auth";
import LoginSVG from "../../assets/images/login.svg?react";
import LoginForm from "../../components/forms/LoginForm";

export const Route = createFileRoute("/_public/login")({
  beforeLoad: ({ context }: { context: { auth?: AuthContextType } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

const initialState: FormLoginType = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const { setToken, setUser } = useAuth();

  const handleLoginAction = async (_prevState: FormLoginType, formData: FormData) => {
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
      navigate({ to: "/" });
      return { email: "", password: "" };
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Login failed. Please check your credentials",
      );
      return { email, password };
    }
  };

  const [formState, formAction, isPending] = useActionState(handleLoginAction, initialState);

  return (
    <div className="divide-secondary h-full w-full divide-x-2 py-20 lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <LoginSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <LoginForm formAction={formAction} formState={formState} isPending={isPending} />
      </div>
    </div>
  );
}
