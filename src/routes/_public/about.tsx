import { createFileRoute, redirect } from "@tanstack/react-router";
import About from "../../pages/About";
import { AuthContextType } from "../../context/AuthContext";

export const Route = createFileRoute("/_public/about")({
  beforeLoad: ({ context }: { context: { auth?: AuthContextType } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: About,
});
