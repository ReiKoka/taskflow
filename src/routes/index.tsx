import { createFileRoute } from "@tanstack/react-router";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import PublicLanding from "../components/landing/PublicLanding";
import AuthenticatedLanding from "../components/landing/AuthenticatedLanding";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }

  const { token } = context;

  return !token ? <PublicLanding /> : <AuthenticatedLanding />;
}
