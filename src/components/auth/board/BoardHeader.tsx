import { useRouter } from "@tanstack/react-router";
import Button from "../../ui/Button";
import { HiArrowLeft, HiPencil, HiTrash } from "react-icons/hi2";
import useModal from "../../../hooks/useModal";
import AddOrEditBoardModal from "../modals/AddOrEditBoardModal";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";
import { BoardWithListsType } from "../../../utils/types";
import DeleteBoardModal from "../modals/DeleteBoardModal";
import React from "react";

type BoardHeaderProps = {
  board: BoardWithListsType;
  setBoard: React.Dispatch<React.SetStateAction<BoardWithListsType>>;
};

const BoardHeader = React.memo(function BoardHeader({
  board,
  setBoard,
}: BoardHeaderProps) {
  const router = useRouter();
  const goBack = () => {
    router.history.back();
  };

  const { workspace, setWorkspace } = useSingleWorkspace();
  const { openModal } = useModal();

  const handleEditClick = () => {
    openModal("editBoard");
  };

  const handleDeleteClick = () => {
    openModal("deleteBoard");
  };

  console.log(board);

  return (
    <section className="border-muted font-secondary text-foreground flex items-center justify-between border-b p-[11px] px-4 text-lg font-semibold">
      <div className="flex gap-4">
        <Button variant="icon" className="group border-0 p-0">
          <HiArrowLeft
            onClick={goBack}
            className="group-hover:fill-primary"
            size={16}
          />
        </Button>
        <p>{board.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleEditClick}>
          <HiPencil />
          <span>Edit Board</span>
        </Button>

        <Button variant="destructive" onClick={handleDeleteClick}>
          <HiTrash />
          <span>Delete Board</span>
        </Button>
      </div>
      <AddOrEditBoardModal
        title="Edit Board"
        modalType="editBoard"
        workspace={workspace}
        setWorkspace={setWorkspace}
        toBeEditedBoard={board}
        setToBeEditedBoard={setBoard}
      />
      <DeleteBoardModal
        title="Delete Board"
        boardId={board.id}
        modalType="deleteBoard"
      />
    </section>
  );
});

export default BoardHeader;
