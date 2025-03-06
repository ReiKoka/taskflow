import { useLoaderData } from "@tanstack/react-router";

import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceMain from "./WorkspaceMain";

function Boards() {
  const workspace = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });
  const authContext = use(AuthContext);
  const user = authContext?.user;
  const isAdmin = user?.id === workspace.userId;

  return (
    <main className="font-secondary flex flex-col px-40 py-6">
      <WorkspaceHeader isAdmin={isAdmin} workspace={workspace} />
      <WorkspaceMain isAdmin={isAdmin} workspace={workspace} />
    </main>
  );
}

export default Boards;
