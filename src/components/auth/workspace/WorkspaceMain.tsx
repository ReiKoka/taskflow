import Button from "../../ui/Button";
import { HiPlus } from "react-icons/hi2";
import BoardCart from "./BoardCart";
import EmptyWorkspace from "./EmptyWorkspace";
import AddOrEditBoardModal from "../modals/AddOrEditBoardModal";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";
import useModal from "../../../hooks/useModal";

type WorkspaceMainProps = {
  isAdmin: boolean;
};

function WorkspaceMain({ isAdmin }: WorkspaceMainProps) {
  const { workspace, setWorkspace } = useSingleWorkspace();
  const { openModal } = useModal();

  const handleCreateBoard = () => {
    if (openModal) openModal("createBoard");
  };

  return (
    <section className="mt-4 flex grow flex-col gap-4">
      <h1 className="text-foreground text-xl font-medium">Boards</h1>

      {!isAdmin && !(workspace?.boards?.length > 0) && <EmptyWorkspace />}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {isAdmin && (
          <Button
            className={`bg-primary/40 text-foreground hover:bg-primary/50 flex items-center justify-center gap-2 rounded-xl border-0 px-4 py-8 transition-all duration-300 ${workspace?.boards?.length === 0 ? "max-w-96" : ""}`}
            onClick={handleCreateBoard}
          >
            <HiPlus size={20} />
            <span>Create Board</span>
          </Button>
        )}

        {workspace?.boards?.length > 0 &&
          workspace?.boards.map((board) => (
            <BoardCart
              key={board.id}
              board={board}
              workspaceId={workspace.id}
            />
          ))}
      </div>
      <AddOrEditBoardModal
        title="Create Board"
        modalType="createBoard"
        workspace={workspace}
        setWorkspace={setWorkspace}
      />
    </section>
  );
}

export default WorkspaceMain;
