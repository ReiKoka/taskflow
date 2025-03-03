import { Link } from "@tanstack/react-router";
import Input from "../ui/Input";
import { HiEnvelope, HiLockClosed, HiPhoto, HiUser } from "react-icons/hi2";
import Button from "../ui/Button";
import { FormRegisterType } from "../../utils/types";

type RegisterFormProps = {
  formAction: (formData: FormData) => void;
  formState: FormRegisterType;
  isPending: boolean;
};

function RegisterForm({ formAction, formState, isPending }: RegisterFormProps) {
  return (
    <form
      action={formAction}
      className="bg-background flex w-8/12 max-w-[600px] min-w-[280px] flex-col gap-6 rounded-lg p-4 sm:p-6 md:p-8"
    >
      <h2 className="font-secondary mb-10 text-center text-xl font-semibold">
        Register
      </h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          id="firstName"
          type="text"
          label="First Name"
          icon={<HiUser />}
          defaultValue={formState?.firstName}
        />
        <Input
          id="lastName"
          type="text"
          label="Last Name"
          icon={<HiUser />}
          defaultValue={formState?.firstName}
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          id="email"
          type="email"
          label="Email"
          icon={<HiEnvelope />}
          defaultValue={formState?.email}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          icon={<HiLockClosed />}
          defaultValue={formState?.password}
        />
      </div>

      <Input
        id="avatar"
        type="text"
        label="Profile Picture"
        icon={<HiPhoto />}
        defaultValue={formState?.avatar}
      />

      <input type="hidden" name="submitType" value="submit" />

      <p className="text-muted-foreground font-secondary text-center text-sm font-medium">
        Already have an account?
        <Link
          className="text-primary ml-3 underline-offset-4 hover:underline"
          to="/login"
        >
          Login Here
        </Link>
      </p>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-end 2xl:gap-4">
        <Button
          type="reset"
          variant="outline"
          className="w-full justify-center text-xs font-medium sm:w-fit md:text-sm 2xl:text-base"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          className="w-full justify-center text-xs font-medium sm:w-fit md:text-sm 2xl:text-base"
        >
          {isPending ? "Submitting" : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
