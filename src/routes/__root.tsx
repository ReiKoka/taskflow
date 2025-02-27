import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LandingNav from "../components/landing/LandingNav";
// import Pattern from "../assets/images/pattern.svg?react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-background dark:bg-secondary text-foreground mx-auto flex h-dvh w-full max-w-[2000px] flex-col">
      <LandingNav />
      <div className="bg-muted/30 dark:bg-background/40 relative mx-2 my-2 max-w-full grow rounded-4xl">
        {/* <div className="absolute top-0 left-0 z-0 h-full max-h-full w-full max-w-full overflow-hidden">
          <Pattern className="text-muted-foreground/10 dark:text-muted-foreground/10 pointer-events-none h-full w-full object-cover" />
        </div> */}
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
