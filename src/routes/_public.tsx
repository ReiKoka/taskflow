import { createFileRoute } from "@tanstack/react-router";
import LayoutWrapper from "../layouts/LayoutWrapper";

export const Route = createFileRoute("/_public")({
  component: () => <LayoutWrapper type="public" />,
});
