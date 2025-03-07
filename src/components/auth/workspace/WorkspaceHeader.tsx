import { HiOutlinePencilSquare, HiTrash, HiUserPlus } from "react-icons/hi2";
import { getFirstLetter } from "../../../utils/helpers";
import { WorkspaceWithBoardsType } from "../../../utils/types";
import Button from "../../ui/Button";
import AddOrEditWorkspaceModal from "./AddOrEditWorkspaceModal";
import { ModalContext } from "../../../context/ModalContext";
import { use } from "react";
import DeleteWorkspaceModal from "./DeleteWorkspaceModal";

type WorkspaceHeaderProps = {
  isAdmin: boolean;
  workspace: WorkspaceWithBoardsType;
  setWorkspace: React.Dispatch<
    React.SetStateAction<WorkspaceWithBoardsType | undefined>
  >;
};

//prettier-ignore
function WorkspaceHeader({isAdmin, workspace, setWorkspace}: WorkspaceHeaderProps) {

  const modalContext = use(ModalContext);
  const openModal = modalContext?.openModal;

  const handleEditClick = () => {
    if (openModal) {
      openModal("editWorkspace");
    }
  };

  const handleDeleteClick = () => {
    if (openModal) {
      openModal("deleteWorkspace");
    }
  };



  return (
    <section className="border-muted flex justify-between border-b pb-6">
      <div className="flex w-fit items-center gap-4">
        <p
          className={`text-background dark:text-foreground bg-primary h-14 w-14 rounded-md text-center text-3xl leading-14 font-medium`}
        >
          {getFirstLetter(workspace.name)}
        </p>
        <div className="flex flex-col">
          <p className="font-medium">{workspace.name}</p>
          <p className="text-muted-foreground text-sm capitalize">
            {workspace.workspaceType}
          </p>
        </div>
      </div>

      {isAdmin && (
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleEditClick}>
            <HiOutlinePencilSquare />
            <span>Edit Workspace</span>
          </Button>

          <Button variant="default">
            <HiUserPlus />
            <span>Add members</span>
          </Button>

          <Button variant="destructive" onClick={handleDeleteClick}>
            <HiTrash />
            <span>Delete Workspace</span>
          </Button>
        </div>
      )}
      <AddOrEditWorkspaceModal
        title="Edit Workspace"
        modalType="editWorkspace"
        oldWorkspace={workspace}
        setOldWorkspace={setWorkspace}
      />
      <DeleteWorkspaceModal title="Delete Workspace" modalType="deleteWorkspace" workspace={workspace}/>
    </section>
  );
}

export default WorkspaceHeader;
