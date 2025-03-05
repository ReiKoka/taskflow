import { use } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContext";

function Sidebar() {

  const workspaceContext = use(WorkspaceContext);

  const workspaces = workspaceContext?.workspaces;

  console.log(workspaces);
  return (
    <div className="border-muted bg-background h-full w-full border-r"></div>
  );
}

export default Sidebar;
