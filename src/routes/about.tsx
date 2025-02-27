import { createFileRoute } from "@tanstack/react-router";
import AboutSvg from "../assets/images/about.svg?react";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 md:p-8 lg:p-8">
      <h1 className="font-primary text-3xl font-medium tracking-wider sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl">
        About Us
      </h1>
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
        <AboutSvg className="mx-auto w-[90%] max-w-[600px]" />
        <h3 className="font-secondary text-sm">
          Welcome to Taskflow – the ultimate workspace for teams to organize
          tasks, track progress, and collaborate effortlessly. Whether you're
          managing a small team or leading large-scale projects, Taskflow
          streamlines your workflow, keeping everyone aligned and productive—all
          in one place.
        </h3>
      </div>
    </div>
  );
}
