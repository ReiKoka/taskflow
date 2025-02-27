import { createFileRoute, Link } from "@tanstack/react-router";
import Input from "../components/ui/Input";
import { useState } from "react";
import { FormRegisterType, RoleType } from "../utils/types";
import RegisterSVG from "../assets/images/register.svg?react";
import { HiEnvelope, HiLockClosed, HiPhoto } from "react-icons/hi2";
import Button from "../components/ui/Button";
import { HiUser } from "react-icons/hi2";
import { register } from "../services/auth";
import { nanoid } from "nanoid";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

const submitData = async (userData: FormData) => {
  const id = nanoid(10);
  const newUser = {
    id,
    firstName: userData.get("firstName") as string,
    lastName: userData.get("lastName") as string,
    email: userData.get("email") as string,
    password: userData.get("password") as string,
    avatar: userData.get("avatar") as string,
    role: "admin" as RoleType,
  };
  console.log(newUser);
  await register(newUser);
};

function RouteComponent() {
  return (
    <div className="h-full w-full lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <RegisterSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <form
          action={submitData}
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
