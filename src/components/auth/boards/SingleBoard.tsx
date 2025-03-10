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
              />
            ) : (
              <Button
                onClick={() => setIsAddingList(true)}
                className="border-muted dark:text-foreground bg-muted-foreground text-muted dark:bg-muted h-fit font-medium"
              >
                <HiPlus strokeWidth={2} />
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
