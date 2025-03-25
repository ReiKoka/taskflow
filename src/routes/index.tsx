import { createFileRoute } from "@tanstack/react-router";
import PublicLanding from "../components/public/PublicLanding";
import AuthenticatedLanding from "../components/auth/landing/AuthenticatedLanding";
import useAuth from "../hooks/useAuth";
import AuthenticatedLayout from "./../layouts/AuthenticatedLayout";
import PublicLayout from "../layouts/PublicLayout";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useAuth();
  return token ? (
    <AuthenticatedLayout>
      <AuthenticatedLanding />
    </AuthenticatedLayout>
  ) : (
    <PublicLayout>
      <PublicLanding />
    </PublicLayout>
  );
}
