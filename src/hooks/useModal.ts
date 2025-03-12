import { use } from "react";
import { ModalContext } from "../context/ModalContext";

function useModal() {
  const context = use(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");

  return context;
}

export default useModal;
