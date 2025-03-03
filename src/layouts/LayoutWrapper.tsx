import { Outlet } from "@tanstack/react-router";
import { AuthContext } from "../context/AuthContext";
import { use } from "react";
import PublicLayout from "./PublicLayout";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { ReactNode } from "react";

function LayoutWrapper({
  type,
  children,
}: {
  type: "public" | "authenticated";
  children?: ReactNode;
}) {
  const auth = use(AuthContext);
  if (type === "authenticated" && !auth) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const layouts = {
    public: PublicLayout,
    authenticated: AuthenticatedLayout,
  };

  const Layout = layouts[type] || PublicLayout;

  return <Layout>{children || <Outlet />}</Layout>;
}

export default LayoutWrapper;
