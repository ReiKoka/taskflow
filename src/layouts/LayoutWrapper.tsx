import { Outlet } from "@tanstack/react-router";
import PublicLayout from "./PublicLayout";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { ReactNode } from "react";

type LayoutWrapperPropsType = {
  type: "public" | "authenticated";
  children?: ReactNode;
};

function LayoutWrapper({ type, children }: LayoutWrapperPropsType) {
  const layouts = {
    public: PublicLayout,
    authenticated: AuthenticatedLayout,
  };

  const Layout = layouts[type] || PublicLayout;

  return <Layout>{children || <Outlet />}</Layout>;
}

export default LayoutWrapper;
