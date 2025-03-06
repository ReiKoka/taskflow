import { Link } from "@tanstack/react-router";
import { HiInboxStack, HiSquares2X2, HiUserGroup } from "react-icons/hi2";
import { WorkspaceWithBoardsType } from "../../../utils/types";

type AdminSidebarContentProps = {
  workspace: WorkspaceWithBoardsType;
};

function AdminSidebarContent({ workspace }: AdminSidebarContentProps) {
  return (
    <ul>
      <li>
        <Link
          to="/workspaces/$workspaceId"
          params={{ workspaceId: workspace.id }}
          className="text-muted-foreground font-secondary hover:bg-muted flex items-center gap-3 px-4 py-3 text-sm"
          activeProps={{
            className: "bg-muted font-medium",
          }}
          activeOptions={{ exact: true }}
        >
          <HiSquares2X2 className="fill-muted-foreground" size={22} />
          <span>Boards</span>
        </Link>
      </li>
      <li>
        <Link
          to="/workspaces/$workspaceId/members"
          params={{ workspaceId: workspace.id }}
          className="text-muted-foreground font-secondary hover:bg-muted flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300"
          activeProps={{
            className: "bg-muted font-medium",
          }}
          activeOptions={{ exact: true }}
        >
          <HiUserGroup className="fill-muted-foreground" size={22} />
          <span>Members</span>
        </Link>
      </li>
    </ul>
  );
}

export default AdminSidebarContent;
