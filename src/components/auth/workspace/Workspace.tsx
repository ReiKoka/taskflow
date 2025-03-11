import { Outlet, useLoaderData } from "@tanstack/react-router";
import Sidebar from "./Sidebar";

import { WorkspaceWithBoardsType } from "../../../utils/types";
import { SingleWorkspaceProvider } from "../../../context/SingleWorkspaceContext";

function Workspace() {
  const workspace: WorkspaceWithBoardsType = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });

  return (
    <div className="grid grid-cols-[270px_minmax(0,1fr)]">
      <SingleWorkspaceProvider initialWorkspace={workspace}>
        <Sidebar />
        <Outlet />
      </SingleWorkspaceProvider>
    </div>
  );
}

export default Workspace;
