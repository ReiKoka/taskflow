import { createFileRoute } from "@tanstack/react-router";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import PublicLanding from "../components/landing/PublicLanding";
import AuthenticatedLanding from "../components/landing/AuthenticatedLanding";
import LayoutWrapper from "../layouts/LayoutWrapper";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }

  const { token } = context;

  return (
    <LayoutWrapper type={token ? "authenticated" : "public"}>
      {token ? <AuthenticatedLanding /> : <PublicLanding />}
    </LayoutWrapper>
  );
}
