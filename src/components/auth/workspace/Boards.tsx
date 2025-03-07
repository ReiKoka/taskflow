import { useLoaderData } from "@tanstack/react-router";

import { use, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceMain from "./WorkspaceMain";
import { WorkspaceWithBoardsType } from "../../../utils/types";

function Boards() {
  const workspaceData = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });
  const authContext = use(AuthContext);
  const user = authContext?.user;

  const [workspace, setWorkspace] = useState<
    WorkspaceWithBoardsType | undefined
  >(workspaceData);
  const isAdmin = user?.id === workspace?.userId;

  useEffect(() => {
    if (workspaceData) {
      setWorkspace(workspaceData);
    }
  }, [workspaceData]);

  return (
    <main className="font-secondary flex flex-col px-40 py-6">
      <WorkspaceHeader
        isAdmin={isAdmin}
        workspace={workspace as WorkspaceWithBoardsType}
        setWorkspace={setWorkspace}
      />
      <WorkspaceMain
        isAdmin={isAdmin}
        workspace={workspace as WorkspaceWithBoardsType}
      />
    </main>
  );
}

export default Boards;
