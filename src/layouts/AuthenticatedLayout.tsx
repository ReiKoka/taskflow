import { ReactNode } from "react";
import AuthNav from "../components/auth/AuthNav";

function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground mx-auto grid h-dvh w-full max-w-[2000px] grid-cols-1 grid-rows-[50px_1fr] flex-col lg:grid-rows-[60px_1fr]">
      <AuthNav />
      {children}
    </div>
  );
}

export default AuthenticatedLayout;
