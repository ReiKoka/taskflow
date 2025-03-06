import { useLoaderData } from "@tanstack/react-router";
import { getFirstLetter } from "../../../utils/helpers";
import Button from "../../ui/Button";
import { HiOutlinePencilSquare, HiPlus, HiUserPlus } from "react-icons/hi2";
import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";
import BoardCart from "./BoardCart";

function Boards() {
  const workspace = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });
  const authContext = use(AuthContext);
  const user = authContext?.user;
  const isAdmin = user?.id === workspace.userId;

  return (
    <main className="font-secondary px-40 py-6">
      <section className="border-muted flex justify-between border-b pb-10">
        <div className="flex w-fit items-center gap-4">
          <p
            className={`text-background dark:text-foreground bg-primary h-14 w-14 rounded-md text-center text-3xl leading-14 font-medium`}
          >
            {getFirstLetter(workspace.name)}
          </p>
          <p className="">{workspace.name}</p>
        </div>

        {isAdmin && (
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
        )}
      </section>

      <section className="mt-10 flex flex-col gap-4">
        <h1 className="text-foreground text-xl font-medium">Boards</h1>
        <div className="grid grid-cols-[repeat(4,300px)] gap-4">
          {isAdmin && (
            <Button className="bg-primary/30 border-0 text-foreground flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-8 hover:bg-primary/50 transition-all duration-300">
              <HiPlus size={20} />
              <span>Create Board</span>
            </Button>
          )}
          {workspace?.boards.map((board) => <BoardCart board={board} workspaceId={workspace.id} />)}
        </div>
      </section>
    </main>
  );
}

export default Boards;
