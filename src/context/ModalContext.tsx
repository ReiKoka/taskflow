import { createContext, FC, ReactNode, RefObject, useRef, useState } from "react";

export type ModalType =
  | "createWorkspace"
  | "editWorkspace"
  | "deleteWorkspace"
  | "createBoard"
  | "editBoard"
  | "deleteBoard"
  | `deleteList-${string}`
  | `editCard-${string}`
  | "addMembers"
  | `deleteMembers-${string}`
  | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  modalRef?: RefObject<HTMLDivElement | null>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  function openModal(modal: ModalType) {
    setActiveModal(modal);
  }

  function closeModal() {
    setActiveModal(null);
  }

  return (
    <ModalContext.Provider value={{ activeModal, closeModal, openModal, modalRef }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext };
