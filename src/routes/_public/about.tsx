import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContextType } from "../../context/AuthContext";
import AboutSvg from "../../assets/images/about.svg?react";

export const Route = createFileRoute("/_public/about")({
  beforeLoad: ({ context }: { context: { auth?: AuthContextType } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: About,
});

export default function About() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 md:p-8 lg:p-8">
      <h1 className="font-primary text-center text-3xl font-medium tracking-wider sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl">
        About Us
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
        <AboutSvg className="mx-auto w-[90%] max-w-[600px]" />
        <h3 className="font-secondary text-sm max-w-[800px] text-center lg:text-base">
          Welcome to Taskflow – the ultimate workspace for teams to organize tasks, track progress,
          and collaborate effortlessly. Whether you're managing a small team or leading large-scale
          projects, Taskflow streamlines your workflow, keeping everyone aligned and productive—all
          in one place.
        </h3>
      </div>
    </div>
  );
}
