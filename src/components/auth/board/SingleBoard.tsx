import { useLoaderData } from "@tanstack/react-router";
import SingleBoardList from "../list/SingleBoardList";
import EmptyBoard from "./EmptyBoard";
import { createList, editList } from "../../../services/lists";
import { useAddItem } from "../../../hooks/useAddItem";
import { BoardWithListsType, ListType } from "../../../utils/types";
import { useEffect, useRef, useState } from "react";
import BoardHeader from "./BoardHeader";
import AddListOnBoard from "./AddListOnBoard";
import { useAllCards } from "../../../hooks/useAllCards";
import { useCardMovement } from "../../../hooks/useCardMovement";
import useSelectedCard from "../../../hooks/useSelectedCard";
import SingleCardModal from "../modals/SingleCardModal";
import useHeight from "../../../hooks/useHeight";

function SingleBoard() {
  // Loading the data from the loader
  const boardData = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId/$boardId",
  });

  // Settings state for the board in order to be able to keep the UI in sync with changes to the data in the db.
  const [board, setBoard] = useState<BoardWithListsType>(boardData);

  // Getting the last ListPosition to use it in re sorting of the cards.
  const lastListPosition = board.lists[board.lists.length - 1]?.position || 0;

  // Using the custom hook to set up the lists.
  const { items, setItems, isAdding, setIsAdding, handleAdd, handleCancel } = useAddItem<ListType>(
    board.lists,
    createList,
    {
      boardId: board.id,
      position: lastListPosition + 1,
    },
  );

  // State for all cards (of the lists of a specific board. => board -> 3 lists each with 3 cards = 9 cards in an array.)
  const { allCards, setAllCards } = useAllCards(items);
  const { handleCardMove } = useCardMovement(allCards, setAllCards);

  // State for managing the selected card in order to render just one modal rather than have one modal instance for each card.
  const { selectedCard, setSelectedCard, handleCardClick } = useSelectedCard();
  const [draggedListId, setDraggedListId] = useState<string | null>(null);
  const [editingListId, setEditingListId] = useState<string | null>(null);

  const handleListEditStateChange = (listId: string, isEditing: boolean) => {
    setEditingListId(isEditing ? listId : null);
  };

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

  //prettier-ignore
  const handleDragStart = (listId: string) => {
    setDraggedListId(listId);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDragEnd = () => {
    setDraggedListId(null);
  };

  // Sort lists by position for rendering
  const sortedItems = [...(items || [])].sort((a, b) => a.position - b.position);

  //prettier-ignore
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>,targetListId: string) => {
    e.preventDefault();

    if (!draggedListId || draggedListId === targetListId) {
      setDraggedListId(null);
      return;
    }

    // Find the dragged list and target list
    const draggedList = sortedItems.find((list) => list.id === draggedListId);
    const targetList = sortedItems.find((list) => list.id === targetListId);

    if (!draggedList || !targetList) {
      setDraggedListId(null);
      return;
    }

    // Find indices in the sorted array
    const draggedIndex = sortedItems.indexOf(draggedList);
    const targetIndex = sortedItems.indexOf(targetList);

    // If positions are the same return
    if (draggedIndex === targetIndex) {
      setDraggedListId(null);
      return;
    }

    try {
      // Get the current positions
      const draggedPosition = draggedList.position;
      const targetPosition = targetList.position;

      // Determine which lists need to be updated
      let listsToUpdate = [];

      // If moving from lower position to higher position
      if (draggedPosition < targetPosition) {
        // Update lists between the dragged position and target position (inclusive)
        listsToUpdate = sortedItems
          .filter(
            (list) =>
              list.position > draggedPosition &&
              list.position <= targetPosition,
          )
          .map((list) => ({
            ...list,
            position: list.position - 1,
          }));

        // Update the dragged list to the target position
        listsToUpdate.push({
          ...draggedList,
          position: targetPosition,
        });
      }
      // If moving from higher position to lower position
      else {
        // Update lists between the target position and dragged position (inclusive)
        listsToUpdate = sortedItems
          .filter(
            (list) =>
              list.position >= targetPosition &&
              list.position < draggedPosition,
          )
          .map((list) => ({
            ...list,
            position: list.position + 1,
          }));

        // Update the dragged list to the target position
        listsToUpdate.push({
          ...draggedList,
          position: targetPosition,
        });
      }

      // Update the database for each list that needs updating
      for (const list of listsToUpdate) {
        await editList(list.id, list);
      }

      // Update local state
      const updatedItems = items?.map((list) => {
        const updatedList = listsToUpdate.find((ul) => ul.id === list.id);
        return updatedList || list;
      });

      setBoard((prev) => ({
        ...prev,
        lists: updatedItems || [],
      }));

      setDraggedListId(null);
    } catch (error) {
      console.error("Failed to update list positions:", error);
    }
  };

  const { heightRef, height } = useHeight();

  return (
    <main className="flex h-[calc(100dvh-60px)] flex-col">
      <BoardHeader board={board} setBoard={setBoard} />

      <section className="flex h-full grow gap-3 overflow-x-auto p-4">
        {board?.lists && board?.lists?.length > 0 ? (
          <>
            {sortedItems.map((list) => (
              <div key={list.id} className="group flex flex-col" ref={heightRef}>
                <div
                  draggable={editingListId === null}
                  onDragStart={() => handleDragStart(list.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, list.id)}
                  onDragEnd={handleDragEnd}
                  className="flex cursor-grab flex-col"
                >
                  <SingleBoardList
                    list={list}
                    setItems={setItems}
                    cards={allCards?.filter((card) => card.listId === list.id)}
                    setAllCards={setAllCards}
                    setBoard={setBoard}
                    onCardMove={handleCardMove}
                    onEditStateChange={handleListEditStateChange}
                    onCardClick={handleCardClick}
                    maxHeight={height}
                  />
                </div>
              </div>
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

      {selectedCard && (
        <SingleCardModal
          title="Edit Card"
          card={selectedCard}
          modalType={`editCard-${selectedCard.id}`}
          updateCards={(updatedCard) => {
            setAllCards((prevCards) =>
              prevCards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
            );
            setSelectedCard(updatedCard);
          }}
          onClose={() => {
            setSelectedCard(null);
          }}
          lists={board.lists}
        />
      )}
    </main>
  );
}

export default SingleBoard;
