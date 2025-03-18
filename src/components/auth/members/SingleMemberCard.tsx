import { HiUser } from "react-icons/hi2";
import { isPicture } from "../../../utils/helpers";
import { AuthenticatedUser } from "../../../utils/types";

type SingleMemberCardProps = {
  user: AuthenticatedUser;
};

function SingleMemberCard({ user }: SingleMemberCardProps) {
  const isAdmin = user?.role === "admin";

  return (
    <div className="shadow-custom-3 dark:border-border dark:shadow-toast-dark back flex gap-8 w-80 flex-col overflow-hidden rounded-3xl dark:border">
      <div className="bg-primary relative h-24 rounded-b-3xl">
        <div className="ring-muted absolute -bottom-6 left-[50%] aspect-square w-20 -translate-x-[50%] overflow-hidden rounded-full ring-2">
          {isPicture(user?.avatar as string) ? (
            <img
              src={user?.avatar}
              alt="profile-picture-admin"
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
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
          {user?.role}
        </p>
      </div>
    </div>
  );
}

export default SingleMemberCard;
