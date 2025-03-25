import { createFileRoute } from "@tanstack/react-router";
import SingleBoard from "../../../components/auth/board/SingleBoard";
import { getBoardById } from "../../../services/boards";
import WorkspaceErrorComponent from "../../../components/error/WorkspaceError";

//prettier-ignore
export const Route = createFileRoute("/_authenticated/workspaces/$workspaceId/$boardId")({
  loader: async ({ params }) => {
    return await getBoardById(params.boardId);
  },
  
  component: SingleBoard,
  errorComponent: WorkspaceErrorComponent,

});
