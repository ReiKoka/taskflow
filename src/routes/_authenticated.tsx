import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContextType } from "../context/AuthContext";
import LayoutWrapper from "../layouts/LayoutWrapper";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }: { context: { auth?: AuthContextType } }) => {
    if (!context?.auth?.token) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <LayoutWrapper type="authenticated" />,
});
