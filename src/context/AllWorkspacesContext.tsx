import { createContext, ReactNode, useState } from "react";
import { WorkspaceType } from "../utils/types";

type AllWorkspacesContextType = {
  workspaces: WorkspaceType[][];
  setWorkspaces: React.Dispatch<React.SetStateAction<WorkspaceType[][]>>;
};

const AllWorkspacesContext = createContext<
  AllWorkspacesContextType | undefined
>(undefined);

type AllWorkspacesProviderProps = {
  children: ReactNode;
};

export const AllWorkspacesProvider = ({
  children,
}: AllWorkspacesProviderProps) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[][]>([]);

  return (
    <AllWorkspacesContext.Provider value={{ workspaces, setWorkspaces }}>
      {children}
    </AllWorkspacesContext.Provider>
  );
};

export { AllWorkspacesContext };
