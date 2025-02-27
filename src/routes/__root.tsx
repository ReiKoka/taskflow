import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LandingNav from "../components/landing/LandingNav";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-background dark:bg-secondary text-foreground mx-auto flex h-dvh w-full max-w-[2000px] flex-col">
      <LandingNav />
      <div className="bg-muted/30 dark:bg-background/40 relative mx-2 my-2 max-w-full grow rounded-4xl overflow-clip">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
