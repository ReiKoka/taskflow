import useAuth from "../../../hooks/useAuth";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";
import MembersMain from "../members/MembersMain";
import WorkspaceHeader from "./WorkspaceHeader";

function Members() {
  const { user } = useAuth();
  const { workspace } = useSingleWorkspace();

  const isAdmin = user?.id === workspace?.userId;
  return (
    <main className="font-secondary flex w-full flex-col px-40 py-6 overflow-hidden">
      <WorkspaceHeader isAdmin={isAdmin} />
      <MembersMain />
    </main>
  );
}

export default Members;
