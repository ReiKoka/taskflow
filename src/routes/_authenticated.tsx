import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import AppLayout from "../components/AuthenticatedLayput";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }: { context: { auth?: AuthContext } }) => {
    if (!context?.auth?.token) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within a AuthContext");
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
