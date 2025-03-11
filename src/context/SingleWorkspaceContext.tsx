// SingleWorkspaceContext.tsx
import { createContext, useState, ReactNode, useEffect } from "react";
import { WorkspaceWithBoardsType } from "../utils/types";

type SingleWorkspaceContextType = {
  workspace: WorkspaceWithBoardsType;
  setWorkspace: React.Dispatch<React.SetStateAction<WorkspaceWithBoardsType>>;
};

const SingleWorkspaceContext = createContext<SingleWorkspaceContextType>(
  {} as SingleWorkspaceContextType, 
);

SingleWorkspaceContext.displayName = "SingleWorkspaceContext";

export const SingleWorkspaceProvider = ({
  children,
  initialWorkspace,
}: {
  children: ReactNode;
  initialWorkspace: WorkspaceWithBoardsType;
}) => {
  const [workspace, setWorkspace] =
    useState<WorkspaceWithBoardsType>(initialWorkspace);

  useEffect(() => {
    setWorkspace(initialWorkspace);
  }, [initialWorkspace]);

  return (
    <SingleWorkspaceContext.Provider value={{ workspace, setWorkspace }}>
      {children}
    </SingleWorkspaceContext.Provider>
  );
};

export { SingleWorkspaceContext };
