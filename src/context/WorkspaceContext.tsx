import { createContext, ReactNode, useState } from "react";
import { WorkspaceType } from "../utils/types";

type WorkspaceContextType = {
  workspaces: WorkspaceType[][];
  setWorkspaces: React.Dispatch<React.SetStateAction<WorkspaceType[][]>>;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

type WorkspaceProviderProps = {
  children: ReactNode;
};

export const WorkspaceProvider = ({ children }: WorkspaceProviderProps) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[][]>([]);

  return (
    <WorkspaceContext.Provider value={{ workspaces, setWorkspaces }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export { WorkspaceContext };
