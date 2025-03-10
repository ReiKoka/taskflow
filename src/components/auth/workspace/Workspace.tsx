import { Outlet, useLoaderData } from "@tanstack/react-router";
import Sidebar from "./Sidebar";

function Workspace() {
  const workspace = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });

  return (
    <div className="grid grid-cols-[270px_minmax(0,1fr)]">
      <Sidebar workspace={workspace} />
      <Outlet />
    </div>
  );
}

export default Workspace;
