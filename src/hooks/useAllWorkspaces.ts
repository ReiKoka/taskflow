import { use } from "react";
import { AllWorkspacesContext } from "../context/AllWorkspacesContext";

function useAllWorkspaces() {
  const context = use(AllWorkspacesContext);
  if (!context)
    throw new Error(
      "useAllWorkspaces must be used within AllWorkspacesProvider",
    );
  return context;
}

export default useAllWorkspaces;
