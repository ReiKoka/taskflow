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
      <div className="max-w-full grow mx-2 mt-2 bg-muted dark:bg-background rounded-t-4xl relative">
        <div className="absolute top-0 left-0 z-0 overflow-hidden max-h-full max-w-full">
          <Pattern className="text-muted-foreground/20 w-full h-full" />
        </div>
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
