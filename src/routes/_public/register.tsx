import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContext } from "../../context/AuthContext";
import Register from "../../pages/Register";

export const Route = createFileRoute("/_public/register")({
  beforeLoad: ({ context }: { context: { auth?: AuthContext } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: Register,
});
