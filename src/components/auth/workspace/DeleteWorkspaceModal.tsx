import { use } from "react";
import { WorkspaceType } from "../../../utils/types";
import { ModalContext } from "../../../context/ModalContext";

type DeleteWorkspaceModalProps = {
  title: string;
  workspace: WorkspaceType;
  modalType: "deleteWorkspace";
};

//prettier-ignore
function DeleteWorkspaceModal({workspace, title, modalType}: DeleteWorkspaceModalProps) {
  const modalContext = use(ModalContext);
  const isOpen = modalContext?.activeModal === modalType;

  return <div>DeleteWorkspaceModal</div>;
}

export default DeleteWorkspaceModal;
