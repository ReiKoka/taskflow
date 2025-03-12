import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceMain from "./WorkspaceMain";

import useAuth from "../../../hooks/useAuth";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";

function Boards() {
  const { user } = useAuth();
  const { workspace } = useSingleWorkspace();

  const isAdmin = user?.id === workspace?.userId;

  return (
    <main className="font-secondary flex w-full flex-col px-40 py-6">
      <WorkspaceHeader isAdmin={isAdmin} />
      <WorkspaceMain isAdmin={isAdmin} />
    </main>
  );
}

export default Boards;
