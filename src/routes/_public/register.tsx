import { createFileRoute, Navigate, redirect, useNavigate } from "@tanstack/react-router";
import { AuthContextType } from "../../context/AuthContext";
import { FormRegisterType, User } from "../../utils/types";
import useAuth from "../../hooks/useAuth";
import { showToast } from "../../utils/showToast";
import { validateEmail } from "../../utils/helpers";
import { nanoid } from "nanoid";
import { register } from "../../services/auth";
import { useActionState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import RegisterSVG from "../../assets/images/register.svg?react";

export const Route = createFileRoute("/_public/register")({
  beforeLoad: ({ context }: { context: { auth?: AuthContextType } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: Register,
});

const initialState: FormRegisterType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  avatar: "",
};

function Register() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleRegisterAction = async (
    _prevState: FormRegisterType | null | undefined,
    formData: FormData,
  ) => {
    const payload = Object.fromEntries(formData.entries());
    const firstName = payload?.firstName as string;
    const lastName = payload?.lastName as string;
    const email = payload?.email as string;
    const password = payload?.password as string;
    const avatar = payload?.avatar as string;
    const submitType = (payload?.submitType as "submit" | "reset") || "submit";

    if (submitType === "reset") return initialState;

    try {
      if (!firstName || !lastName || !email || !password) {
        showToast("warning", "Please fill in all fields");
        return { firstName, lastName, email, password, avatar };
      }
      if (!validateEmail(email)) {
        showToast("error", "Invalid email format");
        return { firstName, lastName, email, password, avatar };
      }

      const user: User = {
        id: nanoid(10),
        firstName,
        lastName,
        email,
        password,
        avatar,
      };

      const newUser = await register(user);
      if (newUser) {
        showToast("success", "Registration successful. Please login");
        navigate({ to: "/login" });
        return initialState;
      }
    } catch (error) {
      showToast(
        "error",
        error instanceof Error ? error.message : "Sign up failed. Please check your information",
      );
      return { firstName, lastName, email, password, avatar };
    }
  };

  const [formState, formAction, isPending] = useActionState(handleRegisterAction, initialState);

  if (token) return Navigate({ to: "/" });

  return (
    <div className="divide-secondary h-full w-full divide-x-2 py-20 lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <RegisterSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <RegisterForm
          formAction={formAction}
          formState={formState as FormRegisterType}
          isPending={isPending}
        />
      </div>
    </div>
  );
}

export default Register;
