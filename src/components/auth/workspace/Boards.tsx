import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { getFirstLetter } from "../../../utils/helpers";
import Button from "../../ui/Button";
import { HiOutlinePencilSquare, HiUserPlus } from "react-icons/hi2";
import { use, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";

function Boards() {
  const workspace = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });
  const authContext = use(AuthContext);
  const user = authContext?.user;

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id !== workspace.userId) {
      navigate({
        to: `/workspaces/$workspaceId/$boardId`,
        params: { workspaceId: workspace.id, boardId: workspace.boards[0].id },
      });
    }
  }, [user, workspace, navigate]);

  return (
    <main className="font-secondary px-40 py-6">
      <section className="flex justify-between">
        <div className="flex w-fit items-center gap-4">
          <p
            className={`text-background dark:text-foreground bg-primary h-14 w-14 rounded-md text-center text-3xl leading-14 font-medium`}
          >
            {getFirstLetter(workspace.name)}
          </p>
          <p className="">{workspace.name}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline">
            <HiOutlinePencilSquare />
            <span>Edit Workspace</span>
          </Button>

          <Button variant="default">
            <HiUserPlus />
            <span>Add members</span>
          </Button>
        </div>
      </section>
    </main>
  );
}

export default Boards;
