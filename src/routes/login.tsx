import { createFileRoute, Link } from "@tanstack/react-router";
import { HiEnvelope } from "react-icons/hi2";
import { login } from "../services/auth";
import { FormLoginType } from "../utils/types";
import LoginSVG from "../assets/images/login.svg?react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { showToast } from "../utils/showToast";
import { validateEmail } from "../utils/helpers";
import { use, useActionState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

const initialState = {
  email: "",
  password: "",
};

function RouteComponent() {
  const context = use(AuthContext);

  // Handle undefined context
  if (!context) {
    throw new Error("ThemeToggle must be used within a ThemeProvider");
  }

  const { setToken, setUser } = context;

  const handleAction = async (
    _prevState: FormLoginType,
    formData: FormData,
  ) => {
    const payload = Object.fromEntries(formData.entries());
    const email = payload?.email as string;
    const password = payload?.password as string;
    const submitType = (payload?.submitType as "submit" | "reset") || "submit";

    if (submitType === "reset") {
      return initialState; // Reset the form state
    }

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
      console.log(user);
      const loggedUser = await login(user);
      setToken(loggedUser?.accessToken);
      setUser(loggedUser?.user);
      showToast("success", `Welcome back ${loggedUser?.user?.firstName}`);
      return { email: "", password: "" }; // Reset after successful login
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
    handleAction,
    initialState,
  );

  return (
    <div className="divide-secondary h-full w-full divide-x-2 py-20 lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <LoginSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <form
          action={formAction}
          className="bg-background flex w-8/12 max-w-[600px] min-w-[280px] flex-col gap-6 rounded-lg p-4 sm:p-6"
        >
          <h2 className="font-secondary mb-10 text-center text-xl font-semibold">
            Sign In
          </h2>
          <Input
            id="email"
            type="email"
            label="Email"
            icon={<HiEnvelope />}
            placeholder="Type your email..."
            defaultValue={formState.email}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            defaultValue={formState.password}
            placeholder="Enter your password"
            icon={<HiEnvelope />}
          />
          {/* Hidden input for submitType */}
          <input type="hidden" name="submitType" value="submit" />
          <p className="text-muted-foreground font-secondary text-center text-sm font-medium">
            Don't have an account?
            <Link
              className="text-primary ml-3 underline-offset-4 hover:underline"
              to="/register"
            >
              Register Here
            </Link>
          </p>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end 2xl:gap-4">
            <Button
              type="submit"
              variant="outline"
              name="submitType"
              value="reset" // Signals reset
              className="w-full justify-center text-xs font-medium sm:w-fit md:text-sm 2xl:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              name="submitType"
              value="submit" // Signals submit
              className="w-full justify-center text-xs font-medium sm:w-fit md:text-sm 2xl:text-base"
            >
              {isPending ? "Submitting" : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
