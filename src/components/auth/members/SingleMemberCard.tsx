//prettier-ignore
import { AuthenticatedUser, WorkspaceWithBoardsType} from "../../../utils/types";
import { HiTrash, HiUser } from "react-icons/hi2";
import { isPicture } from "../../../utils/helpers";
import Button from "../../ui/Button";

type SingleMemberCardProps = {
  user: AuthenticatedUser;
  workspace: WorkspaceWithBoardsType;
  onClick?: () => void;
};

function SingleMemberCard({ user, workspace, onClick }: SingleMemberCardProps) {
  const isAdmin = user?.id === workspace.userId;

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="dark:shadow-muted back bg-background dark:bg-secondary flex w-80 flex-col gap-8 overflow-hidden rounded-3xl shadow-sm">
      <div className="bg-primary relative h-24 rounded-b-3xl">
        <div className="ring-muted-foreground absolute -bottom-6 left-[50%] aspect-square w-20 -translate-x-[50%] overflow-hidden rounded-full ring-4">
          {isPicture(user?.avatar as string) ? (
            <img
              src={user?.avatar}
              alt="profile-picture-admin"
              className="object-cover"
            />
          ) : (
            <div className="bg-muted flex h-full items-center justify-center">
              <HiUser size={34} className="fill-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h3 className="font-primary text-foreground text-center text-lg font-medium tracking-wider">
          {user?.firstName} {user?.lastName}
        </h3>
        <p className="text-muted-foreground text-center text-sm">
          {user?.email}
        </p>
        <div className="flex items-center justify-between">
          <p
            className={`w-fit self-center rounded-lg px-4 py-2 text-xs ${isAdmin ? "text-background dark:text-foreground bg-green-600 dark:bg-green-700" : "bg-primary/30"} capitalize`}
          >
            {isAdmin ? "Admin" : "Member"}
          </p>
          {!isAdmin && (
            <Button
              variant="icon"
              onClick={handleDeleteClick}
              className="group/delete-member hover:bg-destructive rounded-lg border-0 transition-all duration-300"
            >
              <HiTrash
                className="group-hover/delete-member:fill-destructive-foreground fill-muted-foreground transition-all duration-300"
                size={20}
              />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleMemberCard;
