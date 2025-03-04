import { createFileRoute, redirect } from "@tanstack/react-router";
import { use } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import PublicLanding from "../components/public/PublicLanding";
import AuthenticatedLanding from "../components/auth/AuthenticatedLanding";
import LayoutWrapper from "../layouts/LayoutWrapper";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { WorkspaceType } from "../utils/types";
import { jwtDecode } from "jwt-decode";

type LoaderData = {
  workspaces: WorkspaceType[] | null;
};

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }: { context: { auth?: AuthContextType } }) => {
    if (!context?.auth) {
      throw new Error("Auth context is not available");
    }
    const { token, user } = context.auth;

    if (token && !user) {
      try {
        const decoded = jwtDecode<{ sub: string }>(token);
        const res = await axios.get(`${baseURL}/users/${decoded.sub}`);
        const fetchedUser = res.data;
        context.auth = { ...context.auth, user: fetchedUser };
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    console.log(context.auth);

    return { auth: context.auth };
  },
  loader: async ({
    context,
  }: {
    context: { auth?: AuthContextType };
  }): Promise<LoaderData> => {
    const { auth } = context;

    const userId = auth?.user?.id;
    const response = await axios.get(`${baseURL}/workspaces?userId=${userId}`);
    const workspaces = response.data;

    return workspaces;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }

  const { token } = context;

  return (
    <LayoutWrapper type={token ? "authenticated" : "public"}>
      {token ? <AuthenticatedLanding /> : <PublicLanding />}
    </LayoutWrapper>
  );
}
