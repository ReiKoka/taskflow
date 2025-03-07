import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { WorkspaceContext } from "../../context/WorkspaceContext";

import { WorkspaceType } from "../../utils/types";

import Button from "../ui/Button";
import DropdownMenu from "../ui/DropdownMenu";
import DropdownItem from "../ui/DropdownItem";

//prettier-ignore
import {getWorkspacesOfAdmin, getWorkspacesWhereUserIsGuest} from "../../services/workspaces";
//prettier-ignore
import { HiChevronDown, HiExclamationTriangle, HiOutlinePlusCircle} from "react-icons/hi2";
import { ModalContext } from "../../context/ModalContext";
import AddOrEditWorkspaceModal from "./workspace/AddOrEditWorkspaceModal";

function AuthNavLinks() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = use(AuthContext);
  const user = authContext?.user;
  const workspaceContext = use(WorkspaceContext);
  const workspaces = workspaceContext?.workspaces ?? [];
  const modalContext = use(ModalContext);
  const openModal = modalContext?.openModal;
  const setWorkspaces = workspaceContext?.setWorkspaces;

  useEffect(() => {
    if (!user || !setWorkspaces) return;
    const fetchData = async () => {
      const userId = user?.id;
      if (!userId) return;

      try {
        const [workspacesWhereAdmin, workspacesWhereGuest] = await Promise.all([
          getWorkspacesOfAdmin(userId as string),
          getWorkspacesWhereUserIsGuest(userId as string),
        ]);

        setWorkspaces([workspacesWhereAdmin, workspacesWhereGuest]);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchData();
  }, [user, setWorkspaces]);

  const [workspacesWhereAdmin = [], workspacesWhereGuest = []] = workspaces;

  const handleClick = () => {
    if (openModal) {
      openModal("createWorkspace");
    }
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          className="group rounded-md border-0 text-sm hover:translate-0 hover:scale-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>Workspaces</span>
          <HiChevronDown
            className="group-hover:text-primary mt-0.5 transition-all group-focus:rotate-180"
            strokeWidth={1.1}
          />
        </Button>

        <DropdownMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
          {workspacesWhereAdmin.length ? (
            <div className="flex flex-col gap-2">
              <Button className="m-2 text-sm font-medium" onClick={handleClick}>
                <HiOutlinePlusCircle size={20} />
                Create new workspace
              </Button>

              <p className="font-secondary text-foreground border-muted border-t px-2 pt-4 text-xs">
                My workspaces
              </p>
              {workspacesWhereAdmin?.map((workspace: WorkspaceType) => (
                <DropdownItem key={workspace.id} workspace={workspace} />
              ))}
              <p className="font-secondary text-foreground border-muted border-t px-2 pt-4 text-xs">
                Guest workspaces
              </p>
              {workspacesWhereGuest?.map((workspace: WorkspaceType) => (
                <DropdownItem key={workspace.id} workspace={workspace} />
              ))}
            </div>
          ) : (
            <>
              <p className="font-secondary flex flex-col items-center justify-between gap-2 p-2 text-center text-sm font-medium">
                <HiExclamationTriangle className="fill-destructive" size={40} />
                <span>
                  You don't have any workspaces yet! <br />
                  Maybe time to create one?
                </span>
              </p>
              <Button className="mt-3 text-sm font-medium">
                <HiOutlinePlusCircle size={20} />
                Create new workspace
              </Button>
            </>
          )}
        </DropdownMenu>
      </div>
      <AddOrEditWorkspaceModal title="Create Workspace" />
    </>
  );
}

export default AuthNavLinks;
