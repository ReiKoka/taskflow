import { ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { HiXMark } from "react-icons/hi2";
import { useOnClickOutside } from "usehooks-ts";
import useModal from "../../hooks/useModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  const { modalRef } = useModal();

  useOnClickOutside(modalRef as React.RefObject<HTMLDivElement>, onClose);
  if (!isOpen) return null;

  const modalContent = (
    <>
      <div
        className="animate-fade animate-once animate-duration-1000 animate-ease-out dark:bg-secondary/30 fixed inset-0 z-40 h-full w-full bg-transparent backdrop-blur-[2.5px]"
        onClick={onClose}
        style={{ pointerEvents: "auto" }}
      ></div>

      <dialog
        open
        className="fixed inset-0 z-50 m-0 flex h-dvh w-dvw items-center justify-center border-0 bg-transparent p-0"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div
          id="modal-content"
          className="bg-background dark:border-muted dark:bg-secondary shadow-muted-foreground dark:shadow-muted animate-jump-in animate-ease-out relative flex max-h-[90dvh] w-full max-w-xl flex-col overflow-y-auto rounded-lg p-6 shadow-sm duration-500 dark:border"
          ref={modalRef}
        >
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
            className={`font-secondary text-foreground text-center ${
              description ? "-mb-2" : "pb-6"
            } text-xl font-semibold`}
          >
            {title}
          </h2>
          {description && (
            <p className="font-primary text-foreground pb-6 text-center">{description}</p>
          )}
          <div className="w-full max-w-full">{children}</div>
        </div>
      </dialog>
    </>
  );

  return createPortal(modalContent, document.getElementById("modal-root") as HTMLElement);
};

export default Modal;
