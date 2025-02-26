import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LandingNav from "../components/landing/LandingNav";
import Pattern from "../assets/images/pattern.svg?react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="w-full h-dvh flex flex-col max-w-[2000px] bg-background dark:bg-secondary text-foreground mx-auto">
      <LandingNav />
      <div className="max-w-full grow mx-2 my-2 bg-muted/30 dark:bg-background/40 rounded-4xl relative">
        <div className="absolute top-0 left-0 z-0 overflow-hidden max-h-full max-w-full">
          <Pattern className="text-muted-foreground/10 w-full h-full" />
        </div>
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
