import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LandingNav from "../components/Landing/LandingNav";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="w-full h-dvh max-w-[2000px] bg-muted text-foreground mx-auto">
      <LandingNav />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
