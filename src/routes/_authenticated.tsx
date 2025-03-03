import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import AuthenticatedLayout from "../pages/AuthenticatedLayout";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }: { context: { auth?: AuthContext } }) => {
    if (!context?.auth?.token) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within a AuthContext");
  }

  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
}
