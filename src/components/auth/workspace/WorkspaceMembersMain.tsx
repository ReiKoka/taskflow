import { useEffect, useState } from "react";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";
import { AuthenticatedUser, User } from "../../../utils/types";
import { getAllUsersOfWorkspace } from "../../../services/users";
import useAuth from "../../../hooks/useAuth";
import SingleMemberCard from "../members/SingleMemberCard";

function WorkspaceMembersMain() {
  const { workspace } = useSingleWorkspace();
  const { user } = useAuth();
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    if (workspace.members.length === 0) return;

    const fetchMembers = async () => {
      const membersData = await getAllUsersOfWorkspace(workspace.members);
      setMembers(membersData);
    };
    fetchMembers();
  }, [workspace.members]);

  return (
    <section className="mt-4 flex grow flex-col">
      <h1 className="text-foreground text-xl font-medium">Members</h1>
      <div className="relative mt-6 flex flex-col gap-6">
        <div className="border-muted flex flex-col items-center justify-center border-b pb-6">
          <h2 className="text-md mb-4 font-medium">Admin</h2>
          <SingleMemberCard user={user as AuthenticatedUser} />
        </div>

        <div className="flex flex-col flex-wrap items-center justify-center">
          <h2 className="text-md mb-4 font-medium">Workspace Members</h2>
          <div className="flex gap-8">
            {members?.map((member) => <SingleMemberCard user={member} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceMembersMain;
