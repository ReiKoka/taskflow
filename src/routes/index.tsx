import { createFileRoute } from "@tanstack/react-router";
import PublicLanding from "../components/public/PublicLanding";
import AuthenticatedLanding from "../components/auth/landing/AuthenticatedLanding";
import LayoutWrapper from "../layouts/LayoutWrapper";
import useAuth from "../hooks/useAuth";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useAuth();

  return (
    <LayoutWrapper type={token ? "authenticated" : "public"}>
      {token ? <AuthenticatedLanding /> : <PublicLanding />}
    </LayoutWrapper>
  );
}
