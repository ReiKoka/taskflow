import { HiClipboardDocumentList } from "react-icons/hi2";
import { BoardType } from "../../../utils/types";
import Button from "../../ui/Button";
import { useNavigate } from "@tanstack/react-router";

type BoardCartProps = {
  board: BoardType;
  workspaceId: string;
};

function BoardCart({ board, workspaceId }: BoardCartProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      to: "/workspaces/$workspaceId/$boardId",
      params: { workspaceId: workspaceId, boardId: board.id },
    });
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-secondary text-foreground flex cursor-pointer items-center justify-center gap-2 rounded-xl border-0 px-4 py-8"
    >
      <HiClipboardDocumentList size={18} />
      <span>{board.name}</span>
    </Button>
  );
}

export default BoardCart;
