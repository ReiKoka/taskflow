import { HiOutlinePencilSquare, HiTrash, HiUserPlus } from "react-icons/hi2";
import { getFirstLetter } from "../../../utils/helpers";
import Button from "../../ui/Button";
import AddOrEditWorkspaceModal from "../modals/AddOrEditWorkspaceModal";
import DeleteWorkspaceModal from "../modals/DeleteWorkspaceModal";
import Loader from "../../ui/Loader";
import useSingleWorkspace from "../../../hooks/useSingleWorkspace";
import useModal from "../../../hooks/useModal";
import AddMembersModal from "../modals/AddMembersModal";

type WorkspaceHeaderProps = {
  isAdmin: boolean;
};

//prettier-ignore
function WorkspaceHeader({isAdmin}: WorkspaceHeaderProps) {
  const { workspace, setWorkspace } = useSingleWorkspace();
  const { openModal } = useModal();


  const handleEditClick = () => {
      openModal("editWorkspace");
  };

  const handleDeleteClick = () => {
      openModal("deleteWorkspace");
  };

  const handleAddMembers = () => {
    openModal('addMembers')
  }

  if (!workspace) return <Loader />

  return (
    <section className="border-muted flex justify-between border-b pb-6">
      <div className="flex w-fit items-center gap-4">
        <p
          className={`text-background dark:text-foreground bg-primary h-14 w-14 rounded-md text-center text-3xl leading-14 font-medium`}
        >
          {getFirstLetter(workspace.name as string)}
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

          <Button variant="default" onClick={handleAddMembers}>
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
      <AddMembersModal title={"Add new members"} modalType="addMembers" workspace={workspace} setWorkspace={setWorkspace} />
      <DeleteWorkspaceModal title="Delete Workspace" modalType="deleteWorkspace" workspace={workspace}/>
    </section>
  );
}

export default WorkspaceHeader;
