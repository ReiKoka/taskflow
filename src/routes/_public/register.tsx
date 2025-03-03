import { createFileRoute, Link } from "@tanstack/react-router";
import { nanoid } from "nanoid";

import { HiEnvelope, HiLockClosed, HiPhoto, HiUser } from "react-icons/hi2";

import { register } from "../../services/auth";
import { RoleType, User } from "../../utils/types";

import Input from "../../components/ui/Input";
import RegisterSVG from "../../assets/images/register.svg?react";
import Button from "../../components/ui/Button";

import { router } from "../../router";

export const Route = createFileRoute("/_public/register")({
  component: RouteComponent,
});

const handleAction = (formData: FormData) => {
  const id = nanoid(10);
  const newUser: User = {
    id,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    avatar: formData.get("avatar") as string,
    role: "admin" as RoleType,
  };

  console.log(newUser);
  register(newUser);
  router.navigate({ to: "/login" });
};

function RouteComponent() {
  return (
    <div className="divide-secondary h-full w-full divide-x-2 py-20 lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <RegisterSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <form
          action={handleAction}
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
            />
            <Input
              id="lastName"
              type="text"
              label="Last Name"
              icon={<HiUser />}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              id="email"
              type="email"
              label="Email"
              icon={<HiEnvelope />}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              icon={<HiLockClosed />}
            />
          </div>

          <Input
            id="avatar"
            type="text"
            label="Profile Picture"
            icon={<HiPhoto />}
          />

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
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
