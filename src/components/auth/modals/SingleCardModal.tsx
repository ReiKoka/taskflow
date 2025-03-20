import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import useModal from "../../../hooks/useModal";

import { CardType } from "../../../utils/types";
import useChangeStatus from "../../../hooks/useChangeStatus";
import { HiCheck, HiChevronDown } from "react-icons/hi2";
import { useState } from "react";
import DropdownMenu from "../../ui/DropdownMenu";

type SingleCardModalProps = {
  title: string;
  card: CardType;
  modalType: `editCard-${string}`;
  updateCards?: ((updatedCard: CardType) => void) | undefined;
  onClose: () => void;
};

function SingleCardModal({ card, title, modalType, onClose, updateCards }: SingleCardModalProps) {
  const { activeModal } = useModal();
  const isOpen = activeModal === modalType;
  const { status, handleStatusChange } = useChangeStatus(card, updateCards);
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  if (!isOpen) return null;

  

  // const handleCancel = () => {
  //   onClose();
  // };

  // const handleConfirm = async () => {
  //   console.log("Test Card");
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="group/card font-secondary flex w-full max-w-full cursor-pointer items-center gap-4 px-2 py-2">
        <div
          tabIndex={1}
          onClick={handleStatusChange}
          className={`ring-offset-muted border-border flex aspect-square h-5 w-5 cursor-pointer items-center justify-center rounded-full border opacity-100 ring-green-400 ring-offset-2 transition-all duration-300 ease-in group-hover/card:ease-out focus-visible:ring focus-visible:outline-0 ${
            status === "completed" &&
            "border-green-500 bg-green-500 dark:border-green-700 dark:bg-green-700 dark:ring-green-700"
          }`}
        >
          <HiCheck
            size={12}
            strokeWidth={2}
            className={`stroke-background dark:stroke-secondary-foreground animate-duration-500 transition-all ${
              status === "completed"
                ? "animate-jump-in animate-once animate-ease-out opacity-100"
                : "animate-once animate-ease-out animate-jump-out"
            }`}
          />
        </div>
        <h2
          className={`text-foreground max-w-[345px] text-base font-semibold break-words text-ellipsis whitespace-normal transition-transform duration-300 ease-in group-hover/card:translate-x-0 group-hover/card:ease-out`}
        >
          {card?.title}
        </h2>
      </div>

      <div className="ml-11 flex gap-2 items-end">
        <p className="font-secondary text-foreground text-sm">In list </p>
        <div className="relative">
          <Button
            variant="outline"
            className="group rounded-md text-sm hover:translate-0 hover:scale-100 py-0 border border-border px-2 "
            onClick={() => setIsPopupMenuOpen(!isPopupMenuOpen)}
          >
            <span></span>
            <HiChevronDown
              className="group-hover:text-primary mt-0.5 transition-all group-focus:rotate-180"
              strokeWidth={1.1}
            />
          </Button>
          <DropdownMenu isOpen={isPopupMenuOpen} setIsOpen={setIsPopupMenuOpen} position="top-7 left-0" className="dark:bg-secondary border-border border">
            <p className="text-foreground font-secondary">HIIII</p>
          </DropdownMenu>
        </div>
      </div>
    </Modal>
  );
}

export default SingleCardModal;
