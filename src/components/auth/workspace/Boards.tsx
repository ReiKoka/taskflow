import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { getFirstLetter } from "../../../utils/helpers";
import Button from "../../ui/Button";
import { HiOutlinePencilSquare, HiPlus, HiUserPlus } from "react-icons/hi2";
import { use } from "react";
import { AuthContext } from "../../../context/AuthContext";
import BoardCart from "./BoardCart";
import NoBoardsImg from "../../../assets/images/no-boards.svg?react";

function Boards() {
  const workspace = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId",
  });
  const authContext = use(AuthContext);
  const user = authContext?.user;
  const isAdmin = user?.id === workspace.userId;
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate({ to: "/" });
  };

  return (
    <main className="font-secondary flex flex-col px-40 py-6">
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

      <section className="mt-10 flex grow flex-col gap-4">
        <h1 className="text-foreground text-xl font-medium">Boards</h1>
        {!(workspace?.boards?.length > 0) && (
          <div className="flex grow flex-col items-center justify-center gap-10">
            <NoBoardsImg className="-mt-20 h-fit w-40" />
            <h3 className="text-xl font-medium">
              No boards are available in this workspace yet.
            </h3>
            <Button
              variant="default"
              className="w-fit"
              onClick={handleBackHome}
            >
              Back to home
            </Button>
          </div>
        )}
        <div className="grid grid-cols-[repeat(4,300px)] gap-4">
          {isAdmin && (
            <Button className="bg-primary/30 text-foreground hover:bg-primary/50 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-0 px-4 py-8 transition-all duration-300">
              <HiPlus size={20} />
              <span>Create Board</span>
            </Button>
          )}

          {workspace?.boards?.length > 0 &&
            workspace?.boards.map((board) => (
              <BoardCart
                key={board.id}
                board={board}
                workspaceId={workspace.id}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Boards;
