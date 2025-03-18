import NoWorkspacesImg from "../../../assets/images/empty-workspace.svg?react";
import Button from "../../ui/Button";
import { HiPlus } from "react-icons/hi2";
import useModal from "../../../hooks/useModal";

function NoWorkspaces() {
  const { openModal } = useModal();

  const handleClick = () => {
    openModal("createWorkspace");
  };

  return (
    <section className="flex grow flex-col items-center justify-center gap-16">
      <NoWorkspacesImg className="h-50 w-50" />
      <div className="flex flex-col gap-16">
        <h3 className="font-secondary text-xl font-medium">
          No workspaces for this account! Want to create your first one? 🤔
        </h3>
        <Button
          variant="default"
          className="mx-auto w-fit"
          onClick={handleClick}
        >
          <HiPlus size={16} strokeWidth={2} />
          <span>Create new workspace</span>
        </Button>
      </div>
    </section>
  );
}

export default NoWorkspaces;
