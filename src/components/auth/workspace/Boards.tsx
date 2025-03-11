import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceMain from "./WorkspaceMain";

import { SingleWorkspaceContext } from "../../../context/SingleWorkspaceContext";

function Boards() {
  const authContext = use(AuthContext);
  const user = authContext?.user;

  const singleWorkspaceContext = use(SingleWorkspaceContext);
  const workspace = singleWorkspaceContext?.workspace;

  const isAdmin = user?.id === workspace?.userId;

  return (
    <main className="font-secondary flex w-full flex-col px-40 py-6">
      <WorkspaceHeader isAdmin={isAdmin} />
      <WorkspaceMain isAdmin={isAdmin} />
    </main>
  );
}

export default Boards;
