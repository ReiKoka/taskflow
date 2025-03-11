import { use } from "react";
import { WorkspaceType } from "../../../utils/types";
import { ModalContext } from "../../../context/ModalContext";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { deleteWorkspace } from "../../../services/workspaces";
import { useNavigate } from "@tanstack/react-router";
import { showToast } from "../../../utils/showToast";

type DeleteWorkspaceModalProps = {
  title: string;
  workspace: WorkspaceType;
  modalType: "deleteWorkspace";
};

//prettier-ignore
function DeleteWorkspaceModal({workspace, title, modalType}: DeleteWorkspaceModalProps) {
  const modalContext = use(ModalContext);
  const isOpen = modalContext?.activeModal === modalType;
  const closeModal = modalContext?.closeModal as () => void;
  const navigate = useNavigate()

  if (!isOpen) return null;

  const handleCancel = () => {
    closeModal()
  }

  const handleConfirm = async () => {
    await deleteWorkspace(workspace?.id);
    closeModal()
    showToast('success', `Workspace deleted successfully`)
    navigate({to: '/'});
  }

  return <Modal isOpen={isOpen} onClose={closeModal} title={title}>
    <h2 className="text-medium text-base text-center text-foreground font-medium mb-6">Are you sure you want to delete this workspace? This action cannot be undone</h2>
    <div className="flex items-center gap-4 justify-end">
      <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
      <Button type="button" variant="destructive" onClick={handleConfirm}>Confirm Delete</Button>

    </div>
  </Modal>;
}

export default DeleteWorkspaceModal;
