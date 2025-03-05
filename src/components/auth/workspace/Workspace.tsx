import { useLoaderData } from "@tanstack/react-router";

function Workspace() {
  const workspace = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });

  console.log(workspace);
  
  return <div>Workspace</div>;
}

export default Workspace;
