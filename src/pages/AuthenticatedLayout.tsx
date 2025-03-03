import { ReactNode } from "react";

function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default AuthenticatedLayout;
