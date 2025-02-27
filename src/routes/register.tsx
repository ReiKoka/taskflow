import { createFileRoute, Link } from "@tanstack/react-router";
import Input from "../components/ui/Input";
import { useState } from "react";
import { FormRegisterType } from "../utils/types";
import RegisterSVG from "../assets/images/register.svg?react";
import { HiEnvelope, HiLockClosed, HiPhoto } from "react-icons/hi2";
import Button from "../components/ui/Button";
import { HiUser } from "react-icons/hi2";
import { register } from "../services/auth";
import { nanoid } from "nanoid";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState<FormRegisterType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    role: "admin",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = nanoid(10);

    const newUser = { ...formData, id };
    console.log(newUser);
    register(newUser);

  };

  return (
    <div className="h-full w-full lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <RegisterSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
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
              value={formData.firstName}
              onChange={handleChange}
              icon={<HiUser />}
            />
            <Input
              id="lastName"
              type="text"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              icon={<HiUser />}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              id="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              icon={<HiEnvelope />}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              icon={<HiLockClosed />}
            />
          </div>

          <Input
            id="avatar"
            type="text"
            label="Profile Picture"
            value={formData.avatar || ""}
            onChange={handleChange}
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
