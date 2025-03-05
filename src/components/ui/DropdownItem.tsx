import { useNavigate } from "@tanstack/react-router";
import { getFirstLetter } from "../../utils/helpers";
import { WorkspaceType } from "../../utils/types";
import Button from "./Button";

type DropdownItemProps = {
  workspace: WorkspaceType;
};

function DropdownItem({ workspace }: DropdownItemProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: `/workspaces/${workspace?.id}` });
  };

  return (
    <Button
      className="hover:bg-secondary group font-secondary hover:text-secondary-foreground flex w-fit min-w-full items-center justify-start gap-4 rounded-md border-0 p-2 text-sm hover:translate-0"
      variant="outline"
      onClick={handleClick}
    >
      <span className="bg-primary/10 border-muted-foreground group-hover:bg- h-8 w-8 rounded-lg text-center text-lg leading-8 font-semibold">
        {getFirstLetter(workspace.name)}
      </span>
      {workspace.name}
    </Button>
  );
}

export default DropdownItem;
