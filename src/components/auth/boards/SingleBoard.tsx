import { useLoaderData } from "@tanstack/react-router";
import SingleBoardList from "./SingleBoardList";

function SingleBoard() {
  const board = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId/$boardId",
  });

  console.log(board);

  return (
    <main className="flex flex-col">
      <section className="border-muted font-secondary text-foreground border-b p-4 text-lg font-semibold">
        {board.name}
      </section>

      <section className="flex grow gap-3 p-4">
        {board?.lists.length > 0 ? (
          board.lists.map((list) => <SingleBoardList list={list} />)
        ) : (
          <p></p>
        )}
      </section>
    </main>
  );
}

export default SingleBoard;
