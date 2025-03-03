import { createFileRoute, redirect } from "@tanstack/react-router";
import About from "../../pages/About";
import { AuthContext } from "../../context/AuthContext";

export const Route = createFileRoute("/_public/about")({
  beforeLoad: ({ context }: { context: { auth?: AuthContext } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: About,
});
