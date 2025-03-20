import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import useModal from "../../../hooks/useModal";
import { WorkspaceWithBoardsType } from "../../../utils/types";
import { editWorkspace } from "../../../services/workspaces";
import { showToast } from "../../../utils/showToast";

type DeleteMembersModalProps = {
  title: string;
  modalType: `deleteMembers-${string}`;
  onClose: () => void;
  workspace: WorkspaceWithBoardsType;
  setWorkspace: React.Dispatch<React.SetStateAction<WorkspaceWithBoardsType>>;
  memberToDelete: string;
};

//prettier-ignore
function DeleteMembersModal({ title, modalType, onClose, workspace, setWorkspace, memberToDelete}: DeleteMembersModalProps) {
  const {activeModal} = useModal();
  const isOpen = activeModal === modalType;

  if (!isOpen) return null;

  const handleCancel = () => {
    onClose();
  }

  const handleConfirm = async () => {
   try {
    const newMembers = workspace.members.filter(member => member !== memberToDelete);
    setWorkspace(prevWorkspace => ({...prevWorkspace, members: newMembers}));
    await editWorkspace(workspace.id, {...workspace, members: newMembers})
    onClose();
    showToast('success', 'Member successfully removed');
   } catch (error) {
      console.error(error);
      showToast('error', 'Failed to remove member. Please check your console!')
   }
  }

  return <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <h3 className="text-base text-center text-balance text-foreground font-secondary mb-6">Are you sure you want to delete this member? <span className="block">You can still add them again later!</span></h3>
    <div className="flex items-center gap-4 justify-end">
      <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
      <Button type="button" variant="destructive" onClick={handleConfirm}>Confirm Delete</Button>

    </div>
  </Modal>;
}

export default DeleteMembersModal;
