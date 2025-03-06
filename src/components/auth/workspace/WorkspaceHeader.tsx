import { HiOutlinePencilSquare, HiUserPlus } from "react-icons/hi2";
import { getFirstLetter } from "../../../utils/helpers";
import { WorkspaceWithBoardsType } from "../../../utils/types";
import Button from "../../ui/Button";

type WorkspaceHeaderProps = {
  isAdmin: boolean;
  workspace: WorkspaceWithBoardsType;
};

function WorkspaceHeader({ isAdmin, workspace }: WorkspaceHeaderProps) {
  return (
    <section className="border-muted flex justify-between border-b pb-10">
      <div className="flex w-fit items-center gap-4">
        <p
          className={`text-background dark:text-foreground bg-primary h-14 w-14 rounded-md text-center text-3xl leading-14 font-medium`}
        >
          {getFirstLetter(workspace.name)}
        </p>
        <p className="">{workspace.name}</p>
      </div>

      {isAdmin && (
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <HiOutlinePencilSquare />
            <span>Edit Workspace</span>
          </Button>

          <Button variant="default">
            <HiUserPlus />
            <span>Add members</span>
          </Button>
        </div>
      )}
    </section>
  );
}

export default WorkspaceHeader;
