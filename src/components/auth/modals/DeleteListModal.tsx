import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { showToast } from "../../../utils/showToast";
import useModal from "../../../hooks/useModal";
import { deleteList } from "./../../../services/lists";
import { BoardWithListsType } from "../../../utils/types";

type DeleteListModalProps = {
  title: string;
  listId: string;
  modalType: `deleteList-${string}`;
  setBoard: React.Dispatch<React.SetStateAction<BoardWithListsType>>;
};

//prettier-ignore
function DeleteListModal({listId, title, modalType, setBoard}: DeleteListModalProps) {
  const {activeModal, closeModal} = useModal();
  const isOpen = activeModal === modalType;

  if (!isOpen) return null;

  const handleCancel = () => {
    closeModal();
  }

  const handleConfirm = async () => {
    try {
    await deleteList(listId);
    setBoard((prevBoard) => ({ ...prevBoard, lists: prevBoard.lists.filter(list => list.id !== listId) }))
    closeModal()
    showToast('success', `List deleted successfully`)
    } catch (error) {
      console.error('Failed to delete list',error);
    }
  }

  return <Modal isOpen={isOpen} onClose={closeModal} title={title}>
    <h2 className="text-medium text-base text-center text-foreground font-medium font-secondary px-10 mb-6">Are you sure you want to delete this list? This action cannot be undone</h2>
    <div className="flex items-center gap-4 justify-end">
      <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
      <Button type="button" variant="destructive" onClick={handleConfirm}>Confirm Delete</Button>
    </div>
  </Modal>;
}

export default DeleteListModal;
