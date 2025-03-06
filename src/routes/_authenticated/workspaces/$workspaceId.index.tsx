import { createFileRoute } from "@tanstack/react-router";
import Boards from "../../../components/auth/workspace/Boards";

export const Route = createFileRoute(
  "/_authenticated/workspaces/$workspaceId/",
)({
  component: Boards,
});
