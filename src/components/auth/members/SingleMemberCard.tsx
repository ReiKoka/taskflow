import { HiUser } from "react-icons/hi2";
import { isPicture } from "../../../utils/helpers";
import {
  AuthenticatedUser,
  WorkspaceWithBoardsType,
} from "../../../utils/types";

type SingleMemberCardProps = {
  user: AuthenticatedUser;
  workspace: WorkspaceWithBoardsType;
};

function SingleMemberCard({ user, workspace }: SingleMemberCardProps) {
  const isAdmin = user?.id === workspace.userId;

  return (
    <div className="shadow-custom-3 dark:border-border dark:shadow-toast-dark back flex w-80 flex-col gap-8 overflow-hidden rounded-3xl dark:border">
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
        <p
          className={`w-fit self-center rounded-lg px-4 py-2 text-xs ${isAdmin ? "text-background dark:text-foreground bg-green-600 dark:bg-green-700" : "bg-primary/30"} capitalize`}
        >
          {isAdmin ? "Admin" : "Member"}
        </p>
      </div>
    </div>
  );
}

export default SingleMemberCard;
