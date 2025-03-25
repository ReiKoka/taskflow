import { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import { User, WorkspaceWithBoardsType } from "../../../utils/types";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Select from "../../ui/Select";
import { getAllUsers, getAllUsersOfWorkspace } from "../../../services/users";
import useAuth from "../../../hooks/useAuth";
import { editWorkspace } from "../../../services/workspaces";
import { showToast } from "../../../utils/showToast";

type AddMembersModalProps = {
  modalType: "addMembers";
  title: string;
  workspace: WorkspaceWithBoardsType;
  setWorkspace: React.Dispatch<React.SetStateAction<WorkspaceWithBoardsType>>;
};

//prettier-ignore
function AddMembersModal({ modalType, title, workspace, setWorkspace}: AddMembersModalProps) {
  const { activeModal, closeModal } = useModal();
  const isOpen = activeModal === modalType;
  const [otherUsers, setOtherUsers] = useState<User[] | undefined>(undefined);
  const [selectedMember, setSelectedMember] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      const fetchMembers = async () => {
        const allUsers = await getAllUsers(user?.id as string);
        const notWorkspaceUsers = allUsers?.filter((user) =>
          !workspace.members.includes(user.id)
        );
       
        setOtherUsers(notWorkspaceUsers);
      };
      fetchMembers();
    }
  }, [isOpen, user?.id, workspace.members]);

  if (!otherUsers) return

  const options = otherUsers?.map((user) => {
    return {
      value: user.id,
      textValue: `${user.firstName} ${user.lastName}`,
    };
  });


  if (!isOpen) return null;

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newMembersArr = [...workspace.members, selectedMember];
      setWorkspace(prevWorkspace => ({...prevWorkspace, members: newMembersArr}))
      await editWorkspace(workspace.id, {
        ...workspace,
        members: newMembersArr,
      });
      setSelectedMember("")
      closeModal();
      showToast("success", `New member successfully added to workspace`);
    } catch (error) {
      console.log(error);
      showToast("error", "Unable to add new member to workspace");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        {options && options.length > 0 ?         <Select label=""
          placeholderSelected="Choose new member"
          id="members"
          options={options || []}
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        /> : <p className="text-destructive font-medium text-base text-center mb-4">All registered users are already members of this workspace!</p>}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant={options && options.length > 0 ? "outline" : 'destructive'} onClick={handleCancel}>
            {options && options.length > 0 ? "Cancel" : 'Close'}
          </Button>
         {options && options.length > 0 && <Button type="submit" variant="default">
            Add member
          </Button>}
        </div>
      </form>
    </Modal>
  );
}

export default AddMembersModal;
