import { use } from "react";
import { getFirstLetter, getRandomTailwindColor } from "../../../utils/helpers";
import { WorkspaceWithBoardsType } from "../../../utils/types";
import { AuthContext } from "../../../context/AuthContext";
import AdminSidebarContent from "./AdminSidebarContent";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  HiArrowLeftOnRectangle,
  HiClipboardDocumentList,
  HiExclamationTriangle,
} from "react-icons/hi2";
import Button from "../../ui/Button";
import { showToast } from "../../../utils/showToast";


type SidebarProps = {
  workspace: WorkspaceWithBoardsType;
};

function Sidebar({ workspace }: SidebarProps) {
  const authContext = use(AuthContext);
  const user = authContext?.user;
  const setToken = authContext?.setToken;
  const isAdmin = user?.id === workspace.userId;
  const navigate = useNavigate();

  const handleClick = () => {
    if (setToken) {
      setToken("");
      showToast("success", `Goodbye ${user?.firstName}. See you soon!`);
      navigate({ to: "/" });
    }
  };

  return (
    <div className="border-muted bg-background font-secondary flex h-full w-full flex-col self-stretch border-r">
      <div className="border-muted mb-3 flex items-center gap-4 border-b p-3">
        <p
          className={`h-9 w-9 rounded-sm text-center text-lg leading-9 font-medium ${getRandomTailwindColor()} text-background dark:text-foreground`}
        >
          {getFirstLetter(workspace.name)}
        </p>
        <p className="text-foreground text-sm">{workspace.name}</p>
      </div>

      <div>
        {isAdmin && <AdminSidebarContent workspace={workspace} />}

        <p className="mt-2 px-3 py-2 text-sm font-medium">Your boards</p>
        {workspace?.boards.length > 0 ? (
          <ul>
            {workspace?.boards?.map((board) => (
              <li key={board.id}>
                <Link
                  to="/workspaces/$workspaceId/$boardId"
                  params={{ workspaceId: workspace.id, boardId: board.id }}
                  className="text-muted-foreground font-secondary hover:bg-muted flex items-center gap-3 px-4 py-2 text-xs"
                  activeProps={{
                    className: "bg-muted font-medium",
                  }}
                  activeOptions={{ exact: true }}
                >
                  <HiClipboardDocumentList
                    className="fill-muted-foreground"
                    size={18}
                  />
                  <span>{board.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-2 flex items-start justify-between gap-3 px-3">
            <HiExclamationTriangle className="fill-muted-foreground mt-2 w-10" />
            <p className="text-muted-foreground text-sm">
              {isAdmin
                ? "You don't have any boards in this workspace yet! Do you want to create one now?"
                : "No boards are available in this workspace yet!"}
            </p>
          </div>
        )}
      </div>
      <div className="mt-auto w-full px-4">
        <Button
          variant="destructive"
          className="mx-auto mb-4 w-full justify-center text-sm"
          onClick={handleClick}
        >
          <HiArrowLeftOnRectangle size={20} /> <span>Log out</span>
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
