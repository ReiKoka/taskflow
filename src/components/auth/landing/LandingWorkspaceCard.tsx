import { ElementType } from "react";
import { WorkspaceType } from "../../../utils/types";
import { useNavigate } from "@tanstack/react-router";
import { getFirstLetter, getRandomTailwindColor } from "../../../utils/helpers";

type LandingWorkspaceCardProps = {
  icon: ElementType;
  workspaces: WorkspaceType[];
  title: string;
};

function LandingWorkspaceCard({
  icon: Icon,
  workspaces,
  title,
}: LandingWorkspaceCardProps) {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate({ to: `/workspaces/${id}` });
  };

  return (
    <section className="flex flex-col gap-4 px-1 py-4">
      <h1 className="font-secondary flex items-start gap-4 text-base font-medium capitalize">
        <Icon size={20} strokeWidth={1.7} />
        <span>{title}</span>
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4">
        {workspaces?.map((workspace) => (
          <div
            className={`bg-background font-secondary flex h-32 cursor-pointer items-center justify-start gap-4 rounded-lg px-9 py-4 text-center`}
            onClick={() => handleClick(workspace.id)}
          >
            <p
              className={`text-background dark:text-foreground h-14 w-14 rounded-md p-4 text-2xl leading-6 ${getRandomTailwindColor()}`}
            >
              {getFirstLetter(workspace?.name)}
            </p>
            <p>{workspace?.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LandingWorkspaceCard;
