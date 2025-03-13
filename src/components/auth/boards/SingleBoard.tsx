import { useLoaderData } from "@tanstack/react-router";
import SingleBoardList from "../lists/SingleBoardList";
import EmptyBoard from "./EmptyBoard";
import { createList } from "../../../services/lists";
import { useAddItem } from "../../../hooks/useAddItem";
import { BoardWithListsType, ListType } from "../../../utils/types";
import { useEffect, useState } from "react";
import BoardHeader from "./BoardHeader";
import AddListOnBoard from "./AddListOnBoard";
import { useAllCards } from "../../../hooks/useAllCards";
import { useCardMovement } from "../../../hooks/useCardMovement";

function SingleBoard() {
  //prettier-ignore
  const boardData = useLoaderData({from: "/_authenticated/workspaces/$workspaceId/$boardId"});
  const [board, setBoard] = useState<BoardWithListsType>(boardData);
  //prettier-ignore
  const { items, isAdding, setIsAdding, handleAdd, handleCancel } = useAddItem<ListType>(board.lists, createList, {boardId: board.id});
  const { allCards, setAllCards } = useAllCards(items);
  const { handleCardMove } = useCardMovement(allCards, setAllCards);

  useEffect(() => {
    setBoard(boardData);
  }, [boardData]);

  const handleAddListWrapper = async (value: string) => {
    const newList = await handleAdd(value);
    if (newList) {
      const updatedBoard = {
        ...board,
        lists: [...(board.lists || []), newList],
      };
      setBoard(updatedBoard);
    }
  };

  return (
    <main className="flex flex-col">
      <BoardHeader boardName={board.name} />

      <section className="flex grow gap-3 overflow-x-auto p-4">
        {board?.lists && board?.lists?.length > 0 ? (
          <>
            {items?.map((list) => (
              <SingleBoardList
                key={list.id}
                list={list}
                cards={allCards?.filter((card) => card.listId === list.id)}
                setAllCards={setAllCards}
                onCardMove={handleCardMove}
              />
            ))}
            <AddListOnBoard
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              handleAddList={handleAddListWrapper}
              handleCancel={handleCancel}
            />
          </>
        ) : (
          <EmptyBoard
            isAddingList={isAdding}
            setIsAddingList={setIsAdding}
            handleAddListWrapper={handleAddListWrapper}
            handleCancel={handleCancel}
          />
        )}
      </section>
    </main>
  );
}

export default SingleBoard;
