import { ReactNode, useEffect, useRef } from "react";
import Button from "./Button";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

//prettier-ignore
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const modalContent = (
    <dialog
    ref={dialogRef}
    className="fixed top-0 left-0 z-50 m-0 flex h-dvh max-h-none w-dvw overflow-hidden max-w-none items-center justify-center bg-transparent dark:bg-secondary/30 backdrop-blur-[5px] animate-fade animate-once animate-duration-500 animate-ease-out"
    onClose={onClose}
    onClick={handleOutsideClick}
  >
    <div className="bg-background dark:bg-secondary shadow-sm shadow-muted-foreground animate-jump-in duration-500 animate-ease-out flex w-full max-w-md flex-col rounded-lg p-6 max-h-[90dvh] dark:shadow-muted overflow-y-auto">
      <Button
        variant="icon"
        className="border-destructive group/x hover:bg-destructive group w-fit self-end"
        onClick={onClose}
      >
        <HiXMark
          className="fill-destructive group-hover/x:fill-destructive-foreground"
          size={20}
        />
      </Button>
      <h2
        className={`font-secondary text-foreground text-center ${description ? "-mb-2" : "pb-6"} text-xl font-semibold`}
      >
        {title}
      </h2>
      {description && (
        <p className="font-primary text-foreground pb-6 text-center">
          {description}
        </p>
      )}
      <div className="w-full max-w-full ">{children}</div>
    </div>
  </dialog>
  )

  return createPortal(
    modalContent,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
