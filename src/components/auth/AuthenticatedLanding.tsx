import { use } from "react";
import { WorkspaceContext } from "../../context/WorkspaceContext";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";
import { HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi2";
import Loader from "../ui/Loader";
import LandingWorkspaceCard from "./landing/LandingWorkspaceCard";

function AuthenticatedLanding() {
  const workspaceContext = use(WorkspaceContext);
  const authContext = use(AuthContext);

  const workspaces = workspaceContext?.workspaces;
  const user = authContext?.user;

  if (!user || !workspaces) return <Loader />;

  const [workspacesWhereAdmin, workspacesWhereGuest] = workspaces;

  return (
    <main className="bg-muted dark:bg-secondary mx-auto my-2 w-full max-w-[1400px] rounded-lg px-4">
      <section className="border-border flex items-center justify-end gap-4 border-b px-1 py-4">
        <Avatar img={user?.avatar} />
        <h1 className="font-secondary text-foreground text-base font-medium">
          {user?.firstName} {user?.lastName}
        </h1>
      </section>

      <LandingWorkspaceCard
        icon={HiOutlineUser}
        workspaces={workspacesWhereAdmin}
        title="your workspaces"
      />

      <LandingWorkspaceCard
        icon={HiOutlineUserGroup}
        workspaces={workspacesWhereGuest}
        title="guest workspaces"
      />
    </main>
  );
}

export default AuthenticatedLanding;
