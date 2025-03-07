import { WorkspaceWithBoardsType } from "../../../utils/types";

import Button from "../../ui/Button";

import { HiPlus } from "react-icons/hi2";
import BoardCart from "./BoardCart";
import EmptyWorkspace from "./EmptyWorkspace";

type WorkspaceMainProps = {
  isAdmin: boolean;
  workspace: WorkspaceWithBoardsType;
};

function WorkspaceMain({ isAdmin, workspace }: WorkspaceMainProps) {
  return (
    <section className="mt-6 flex grow flex-col gap-4">
      <h1 className="text-foreground text-xl leading-2.5 font-medium">Boards</h1>
      
      {(!isAdmin && !(workspace?.boards?.length > 0)) && <EmptyWorkspace />}

      <div className="grid grid-cols-[repeat(4,300px)] gap-4">
        {isAdmin && (
          <Button className="bg-primary/30 text-foreground hover:bg-primary/50 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-0 px-4 py-8 transition-all duration-300">
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
    </section>
  );
}

export default WorkspaceMain;
