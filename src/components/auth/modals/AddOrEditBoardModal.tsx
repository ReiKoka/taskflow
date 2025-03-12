import { useCallback, useState } from "react";
import Modal from "../../ui/Modal";

import Input from "../../ui/Input";
import { BoardType, WorkspaceWithBoardsType } from "../../../utils/types";
import Button from "../../ui/Button";
import { nanoid } from "nanoid";
import { createBoard } from "../../../services/boards";
import { showToast } from "../../../utils/showToast";
import useModal from "../../../hooks/useModal";

type AddOrEditBoardModalProps = {
  title: string;
  modalType: "createBoard" | "editBoard";
  workspace: WorkspaceWithBoardsType;
  setWorkspace: React.Dispatch<React.SetStateAction<WorkspaceWithBoardsType>>;
};

//prettier-ignore
function AddOrEditBoardModal({ title, modalType, workspace, setWorkspace}: AddOrEditBoardModalProps) {
  const {activeModal, closeModal} = useModal();
  const isOpen = activeModal === modalType;
 
  const [currentBoard, setCurrentBoard] = useState<BoardType | undefined>(
    () => {
      if (modalType === "createBoard") {
        return {
          id: "",
          name: "", 
          workspaceId: workspace?.id,
        } as BoardType;
      }
    },
  );

  const handleFieldChange = useCallback(
    (field: keyof BoardType, value: string) => {
      setCurrentBoard((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    [],
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const id = nanoid(15);
      const newBoard = { ...currentBoard, id } as BoardType;
      await createBoard(newBoard as BoardType);
      setWorkspace((prevWorkspace) => {
        if (!prevWorkspace) return prevWorkspace;
        return {
          ...prevWorkspace,
          boards: [...(prevWorkspace.boards || []), newBoard],
        };
      });
      showToast("success", "Board created successfully!");
      closeModal();
    } catch (error) {
      console.error("Failed to create board:", error);
      showToast("error", "Failed to create board. Please try again.");
    }
  };

  return (
    <Modal title={title} isOpen={isOpen} onClose={closeModal}>
      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          id="name"
          type="text"
          label="Board Name"
          placeholder="Enter board name..."
          value={currentBoard?.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          required
        />

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="default">
            {modalType === "createBoard" ? "Create Board" : "Edit Board"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddOrEditBoardModal;
