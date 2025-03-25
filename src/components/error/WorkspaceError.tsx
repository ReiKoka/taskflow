import { useEffect } from "react";
import { showToast } from "../../utils/showToast";
import { renderNotFound } from "../ui/NotFound";

function WorkspaceErrorComponent({ error }: { error: Error }) {

  useEffect(() => {
    showToast(
      "error",
      "An error has occurred. Please contact your IT support or Development Team.",
    );
  }, [error]);

  return <div>{renderNotFound(error.message)}</div>;
}

export default WorkspaceErrorComponent;
