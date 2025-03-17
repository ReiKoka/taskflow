import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { showToast } from "../../../utils/showToast";
import useModal from "../../../hooks/useModal";
import { deleteBoard } from "../../../services/boards";

type DeleteBoardModalProps = {
  title: string;
  boardId: string;
  modalType: "deleteBoard";
};

//prettier-ignore
function DeleteBoardModal({boardId, title, modalType}: DeleteBoardModalProps) {
  const {activeModal, closeModal} = useModal();
  const isOpen = activeModal === modalType;
  const location = useLocation();
  const navigate = useNavigate();
  
  const urlToGoBack = location.pathname.split('/').slice(0, location.pathname.split('/').length - 1).join('/');
  
  if (!isOpen) return null;

  const handleCancel = () => {
    closeModal();
  }

  const handleConfirm = async () => {
    await deleteBoard(boardId);
    closeModal()
    showToast('success', `Board deleted successfully`)
    navigate({to: urlToGoBack});
  }

  return <Modal isOpen={isOpen} onClose={closeModal} title={title}>
    <h2 className="text-medium text-base text-center text-foreground font-medium mb-6">Are you sure you want to delete this board? This action cannot be undone</h2>
    <div className="flex items-center gap-4 justify-end">
      <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
      <Button type="button" variant="destructive" onClick={handleConfirm}>Confirm Delete</Button>

    </div>
  </Modal>;
}

export default DeleteBoardModal;
