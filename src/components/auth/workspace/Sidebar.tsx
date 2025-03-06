import { use } from "react";
import { getFirstLetter, getRandomTailwindColor } from "../../../utils/helpers";
import { WorkspaceWithBoardsType } from "../../../utils/types";
import { AuthContext } from "../../../context/AuthContext";
import AdminSidebarContent from "./AdminSidebarContent";
import { Link } from "@tanstack/react-router";
import {
  HiClipboardDocumentList,
  HiExclamationTriangle,
} from "react-icons/hi2";

type SidebarProps = {
  workspace: WorkspaceWithBoardsType;
};

function Sidebar({ workspace }: SidebarProps) {
  const authContext = use(AuthContext);
  const user = authContext?.user;

  return (
    <div className="border-muted bg-background font-secondary h-full w-full border-r">
      <div className="border-muted flex items-center gap-4 border-b p-3">
        <p
          className={`h-9 w-9 rounded-sm text-center text-lg leading-9 font-medium ${getRandomTailwindColor()} text-background dark:text-foreground`}
        >
          {getFirstLetter(workspace.name)}
        </p>
        <p className="text-foreground text-sm">{workspace.name}</p>
      </div>

      <div className="mt-2">
        {user?.id === workspace.userId && (
          <AdminSidebarContent workspace={workspace} />
        )}

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
              You don't have any boards in this workspace yet! Do you want to
              create one now?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
