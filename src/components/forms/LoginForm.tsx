import { HiEnvelope } from "react-icons/hi2";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from "@tanstack/react-router";
import { FormLoginType } from "../../utils/types";

interface LoginFormProps {
  formAction: (formData: FormData) => void;
  formState: FormLoginType;
  isPending: boolean;
}

export default function LoginForm({
  formAction,
  formState,
  isPending,
}: LoginFormProps) {
  return (
    <form
      action={formAction}
      className="bg-background shadow-card dark:shadow-toast-dark flex w-8/12 max-w-[600px] min-w-[280px] flex-col gap-6 rounded-lg p-4 sm:p-6"
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
          value="reset"
          className="w-full justify-center text-xs font-medium sm:w-fit md:text-sm 2xl:text-base"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          name="submitType"
          value="submit"
          className="w-full justify-center text-xs font-medium sm:w-fit md:text-sm 2xl:text-base"
        >
          {isPending ? "Submitting" : "Sign In"}
        </Button>
      </div>
    </form>
  );
}
