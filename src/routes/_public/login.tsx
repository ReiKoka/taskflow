import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContext } from "../../context/AuthContext";
import Login from "../../pages/Login";

export const Route = createFileRoute("/_public/login")({
  beforeLoad: ({ context }: { context: { auth?: AuthContext } }) => {
    if (context?.auth?.token) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});
