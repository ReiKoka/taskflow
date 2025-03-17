import { createContext, FC, ReactNode, useState } from "react";

export type ModalType =
  | "createWorkspace"
  | "editWorkspace"
  | "deleteWorkspace"
  | "createBoard"
  | "editBoard"
  | "deleteBoard"
  | "deleteList"
  | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  function openModal(modal: ModalType) {
    setActiveModal(modal);
  }

  function closeModal() {
    setActiveModal(null);
  }

  return (
    <ModalContext.Provider value={{ activeModal, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext };
