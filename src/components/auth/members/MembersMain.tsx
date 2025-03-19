import { useEffect, useState } from "react";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";
import { AuthenticatedUser, User } from "../../../utils/types";
import { getAllUsersOfWorkspace } from "../../../services/users";
import useAuth from "../../../hooks/useAuth";
import SingleMemberCard from "./SingleMemberCard";
import useModal from "../../../hooks/useModal";
import DeleteMembersModal from "../modals/DeleteMembersModal";

function MembersMain() {
  const { workspace, setWorkspace } = useSingleWorkspace();
  const { user } = useAuth();
  const [members, setMembers] = useState<User[]>([]);
  const { openModal, closeModal } = useModal();
  const [memberToDelete, setMemberToDelete] = useState("");

  useEffect(() => {
    if (workspace.members.length === 0) return;

    const fetchMembers = async () => {
      const membersData = await getAllUsersOfWorkspace(workspace.members);
      setMembers(membersData);
    };
    fetchMembers();
  }, [workspace.members]);

  const handleDeleteMember = (memberId: string) => {
    setMemberToDelete(memberId);
    openModal(`deleteMembers-${memberId}`);
  };

  return (
    <>
      <section className="mt-4 flex grow flex-col overflow-hidden">
        <h1 className="text-foreground text-xl font-medium">Members</h1>
        <div className="relative flex flex-col gap-4 overflow-y-auto">
          <div className="border-muted flex flex-col items-center justify-center border-b pb-6">
            <h2 className="text-md mb-4 font-medium">Admin</h2>
            <SingleMemberCard
              user={user as AuthenticatedUser}
              workspace={workspace}
            />
          </div>

          <div className="flex w-full flex-col flex-wrap justify-center">
            <h2 className="text-md mb-4 max-w-full text-center font-medium">
              Workspace Members
            </h2>
            <div className="mb-6 flex flex-wrap justify-center gap-6">
              {members?.map((member) => (
                <SingleMemberCard
                  key={member.id}
                  user={member}
                  workspace={workspace}
                  onClick={() => handleDeleteMember(member.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <DeleteMembersModal
        title={`Delete Member ${members.find((member) => member.id === memberToDelete)?.firstName}`}
        modalType={`deleteMembers-${memberToDelete}`}
        onClose={closeModal}
        workspace={workspace}
        setWorkspace={setWorkspace}
        setMembers={setMembers}
        memberToDelete={memberToDelete}
      />
    </>
  );
}

export default MembersMain;
