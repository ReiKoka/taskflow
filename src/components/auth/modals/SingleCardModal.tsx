import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import useModal from "../../../hooks/useModal";

import { CardType } from "../../../utils/types";

type SingleCardModalProps = {
  title: string;
  card: CardType;
  modalType: `editCard-${string}`;
};

//prettier-ignore
function SingleCardModal({card, title, modalType}: SingleCardModalProps) {
  const {activeModal, closeModal} = useModal();
  const isOpen = activeModal === modalType;
  console.log(card)
  
  if (!isOpen) return null;

  const handleCancel = () => {
    closeModal();
  }

  const handleConfirm = async () => {
    console.log('Test Card')
  }

  return <Modal isOpen={isOpen} onClose={closeModal} title={title}>
    <h2 className="text-medium text-base text-center text-foreground font-medium mb-6">Card Modal</h2>
    <div className="flex items-center gap-4 justify-end">
      <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
      <Button type="button" variant="destructive" onClick={handleConfirm}>Confirm Delete</Button>

    </div>
  </Modal>;
}

export default SingleCardModal;
