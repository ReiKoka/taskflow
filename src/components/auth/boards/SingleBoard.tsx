import { useLoaderData } from "@tanstack/react-router";
import SingleBoardList from "./SingleBoardList";
import EmptyBoard from "./EmptyBoard";
import Button from "../../ui/Button";
import { HiPlus } from "react-icons/hi2";
import InlineInput from "../../ui/InlineInput";
import { createList } from "../../../services/lists";
import { useAddItem } from "../../../hooks/useAddItem";
import { ListType } from "../../../utils/types";

function SingleBoard() {
  const board = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId/$boardId",
  });

  const {
    items: lists,
    isAdding: isAddingList,
    setIsAdding: setIsAddingList,
    handleAdd: handleAddList,
    handleCancel,
  } = useAddItem<ListType>(board.lists, createList, { boardId: board.id });

  return (
    <main className="flex flex-col">
      <section className="border-muted font-secondary text-foreground border-b p-4 text-lg font-semibold">
        {board.name}
      </section>

      <section className="flex grow gap-3 overflow-x-auto p-4">
        {board?.lists && board?.lists?.length > 0 ? (
          <>
            {lists?.map((list) => (
              <SingleBoardList key={list.id} list={list} />
            ))}
            {isAddingList ? (
              <InlineInput
                placeholder="Enter list name..."
                onSave={handleAddList}
                onCancel={handleCancel}
                className="min-h-24 min-w-72"
                buttonText="list"
              />
            ) : (
              <Button
                onClick={() => setIsAddingList(true)}
                className="bg-primary/40 text-foreground flex items-center justify-center hover:bg-primary/50 h-fit min-w-72 border-0"
              >
                <HiPlus strokeWidth={1} />
                <span>Add another list</span>
              </Button>
            )}
          </>
        ) : (
          <EmptyBoard />
        )}
      </section>
    </main>
  );
}

export default SingleBoard;
