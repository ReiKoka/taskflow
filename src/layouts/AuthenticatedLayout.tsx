import { Outlet } from "@tanstack/react-router";
import AuthNav from "../components/auth/AuthNav";
import { ReactNode } from "react";

function AuthenticatedLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="bg-background text-foreground mx-auto grid h-dvh max-h-dvh w-full max-w-[2000px] grid-cols-1 grid-rows-[50px_1fr] flex-col overflow-hidden lg:grid-rows-[60px_1fr]">
      <AuthNav />
      {children ? children : <Outlet />}
    </div>
  );
}

export default AuthenticatedLayout;
