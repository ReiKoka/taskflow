import { ReactNode } from "react";
import LandingNav from "./landing/LandingNav";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background dark:bg-secondary text-foreground mx-auto flex h-dvh w-full max-w-[2000px] flex-col">
      <LandingNav />
      <div className="bg-muted/30 shadow-2xl dark:bg-background/40 relative mx-2 my-2 max-w-full grow overflow-clip rounded-4xl">
        {children}
      </div>
    </div>
  );
}

export default PublicLayout;
