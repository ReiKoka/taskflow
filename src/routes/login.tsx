import { createFileRoute, Link } from "@tanstack/react-router";
import LoginSVG from "../assets/images/login.svg?react";
import { useState } from "react";
import { FormLoginType } from "../utils/types";
import { login } from "../services/auth";
import Input from "../components/ui/Input";
import { HiEnvelope } from "react-icons/hi2";
import Button from "../components/ui/Button";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [formData, setFormData] = useState<FormLoginType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    login(formData);
  };

  return (
    <div className="h-full w-full lg:grid lg:grid-cols-2">
      <div className="hidden h-full items-center justify-center lg:flex">
        <LoginSVG className="max-h-[600px] w-fit lg:block" />
      </div>
      <div className="flex h-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-background flex w-8/12 max-w-[600px] min-w-[280px] flex-col gap-6 rounded-lg p-4 sm:p-6"
        >
          <h2 className="font-secondary mb-10 text-center text-xl font-semibold">
            Sign In
          </h2>
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
            icon={<HiEnvelope />}
          />
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
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
