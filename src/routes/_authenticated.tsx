import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContext } from "../context/AuthContext";

import LayoutWrapper from "../layouts/LayoutWrapper";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }: { context: { auth?: AuthContext } }) => {
    if (!context?.auth?.token) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <LayoutWrapper type="authenticated" />,
});
