import useAuth from "../../../hooks/useAuth";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceMembersMain from "./WorkspaceMembersMain";

function Members() {
  const { user } = useAuth();
  const { workspace } = useSingleWorkspace();

  const isAdmin = user?.id === workspace?.userId;
  return (
    <main className="font-secondary flex w-full flex-col px-40 py-6">
      <WorkspaceHeader isAdmin={isAdmin} />
      <WorkspaceMembersMain />
    </main>
  );
}

export default Members;
