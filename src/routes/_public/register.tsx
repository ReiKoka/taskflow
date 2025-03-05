import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContextType } from "../../context/AuthContext";
import Register from "../../pages/Register";

export const Route = createFileRoute("/_public/register")({
  beforeLoad: ({ context }: { context: { auth?: AuthContextType } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: Register,
});
