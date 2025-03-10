import { useLoaderData } from "@tanstack/react-router";
import SingleBoardList from "./SingleBoardList";
import EmptyBoard from "./EmptyBoard";
import Button from "../../ui/Button";
import { HiPlus } from "react-icons/hi2";
import { useState } from "react";
import InlineInput from "../../ui/InlineInput";
import { ListType } from "../../../utils/types";
import { createList } from "../../../services/lists";
import { nanoid } from "nanoid";

function SingleBoard() {
  const board = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId/$boardId",
  });

  const [lists, setLists] = useState<ListType[] | undefined>(board.lists);
  const [isAddingList, setIsAddingList] = useState(false);

  const handleAddList = async (listName: string) => {
    setIsAddingList(false);
    const data = {
      id: nanoid(15),
      name: listName,
      boardId: board.id,
    };
    setLists((prevList) => (prevList ? [...prevList, data] : [data]));
    await createList(data);
  };

  const handleCancel = () => {
    setIsAddingList(false);
  };

  return (
    <main className="flex flex-col">
      <section className="border-muted font-secondary text-foreground border-b p-4 text-lg font-semibold">
        {board.name}
      </section>

      <section className="flex grow gap-3 overflow-x-auto p-4">
        {lists && lists?.length > 0 ? (
          <>
            {lists.map((list) => (
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
