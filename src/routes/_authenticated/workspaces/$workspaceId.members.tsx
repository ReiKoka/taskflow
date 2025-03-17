import { createFileRoute } from "@tanstack/react-router";
import Members from "../../../components/auth/workspace/Members";

export const Route = createFileRoute(
  "/_authenticated/workspaces/$workspaceId/members",
)({
  component: Members,
});
