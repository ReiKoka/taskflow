import { use } from "react";
import { SingleWorkspaceContext } from "../context/SingleWorkspaceContext";

function useSingleWorkspace() {
  const context = use(SingleWorkspaceContext);
  if (!context)
    throw new Error(
      "useSingleWorkspace must be used within SingleWorkspaceProvider",
    );

  return context;
}

export default useSingleWorkspace;
