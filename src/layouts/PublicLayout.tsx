import { ReactNode } from "react";
import LandingNav from "../components/public/LandingNav";
import { Outlet } from "@tanstack/react-router";

function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-background dark:bg-secondary text-foreground mx-auto flex h-dvh w-full max-w-[2000px] flex-col overflow-hidden">
      <LandingNav />
      <div className="bg-muted/30 dark:bg-background/40 relative mx-2 my-2 max-w-full grow overflow-clip rounded-4xl shadow-2xl">
        {children ? children : <Outlet />}
      </div>
    </div>
  );
}

export default PublicLayout;
