import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return <div>Landing Page</div>;
}
