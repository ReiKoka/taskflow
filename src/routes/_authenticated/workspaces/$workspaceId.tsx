import { createFileRoute } from "@tanstack/react-router";
import Workspace from "../../../components/auth/workspace/Workspace";
import { getSingleWorkspaceWithBoards } from "../../../services/workspaces";

export const Route = createFileRoute("/_authenticated/workspaces/$workspaceId")(
  {
    loader: async ({ params }) => {
      return await getSingleWorkspaceWithBoards(params.workspaceId);
    },
    component: Workspace,
  },
);
