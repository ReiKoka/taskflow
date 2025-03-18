import Avatar from "../../ui/Avatar";
import {
  HiArrowLeftOnRectangle,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import Loader from "../../ui/Loader";
import LandingWorkspaceCard from "./LandingWorkspaceCard";
import useAllWorkspaces from "../../../hooks/useAllWorkspaces";
import useAuth from "../../../hooks/useAuth";
import NoWorkspaces from "./NoWorkspaces";
import Button from "../../ui/Button";
import { showToast } from "../../../utils/showToast";
import { useNavigate } from "@tanstack/react-router";

function AuthenticatedLanding() {
  const { workspaces } = useAllWorkspaces();
  const { user, setToken } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (setToken) {
      setToken("");
      showToast("success", `Goodbye ${user?.firstName}. See you soon!`);
      navigate({ to: "/" });
    }
  };

  if (!user || !workspaces) return <Loader />;

  const [workspacesWhereAdmin, workspacesWhereGuest] = workspaces;

  return (
    <main className="bg-muted dark:bg-secondary/30 mx-auto my-2 flex max-h-full w-full max-w-[1400px] flex-col overflow-y-hidden rounded-lg px-4">
      <section className="border-border flex items-center justify-between gap-4 border-b px-1 py-4">
        <div className="flex items-center gap-4">
          <Avatar img={user?.avatar} />
          <h1 className="font-secondary text-foreground text-base font-medium capitalize">
            {user?.firstName} {user?.lastName}
          </h1>
        </div>
        <div className="w-fit">
          <Button
            variant="destructive"
            className="w-full justify-center text-sm"
            onClick={handleClick}
          >
            <HiArrowLeftOnRectangle size={20} /> <span>Log out</span>
          </Button>
        </div>
      </section>

      {workspacesWhereAdmin.length > 0 || workspacesWhereGuest.length > 0 ? (
        <>
          <LandingWorkspaceCard
            icon={HiOutlineUser}
            workspaces={workspacesWhereAdmin}
            title="admin workspaces"
          />

          <LandingWorkspaceCard
            icon={HiOutlineUserGroup}
            workspaces={workspacesWhereGuest}
            title="guest workspaces"
          />
        </>
      ) : (
        <NoWorkspaces />
      )}
    </main>
  );
}

export default AuthenticatedLanding;
