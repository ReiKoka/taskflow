import { useLoaderData, useRouter } from "@tanstack/react-router";
import SingleBoardList from "./SingleBoardList";
import EmptyBoard from "./EmptyBoard";
import Button from "../../ui/Button";
import { HiArrowLeft, HiPlus } from "react-icons/hi2";
import InlineInput from "../../ui/InlineInput";
import { createList } from "../../../services/lists";
import { useAddItem } from "../../../hooks/useAddItem";
import { CardType, ListType } from "../../../utils/types";
import { useEffect, useState } from "react";
import { editCardListId, getCards } from "../../../services/cards";
import { showToast } from "../../../utils/showToast";

function SingleBoard() {
  const board = useLoaderData({
    from: "/_authenticated/workspaces/$workspaceId/$boardId",
  });

  const router = useRouter();
  const goBack = () => {
    router.history.back();
  };

  const [listCards, setListCards] = useState<Record<string, CardType[]>>({});

  const {
    items: lists,
    isAdding: isAddingList,
    setIsAdding: setIsAddingList,
    handleAdd: handleAddList,
    handleCancel,
  } = useAddItem<ListType>(board.lists || [], createList, {
    boardId: board.id,
  });

  useEffect(() => {
    const loadAllCards = async () => {
      const cardsMap: Record<string, CardType[]> = {};

      for (const list of lists ?? []) {
        try {
          const cards = await getCards(list.id);
          cardsMap[list.id] = cards;
        } catch (error) {
          console.error(`Failed to fetch cards for list ${list.id}:`, error);
        }
      }

      setListCards(cardsMap);
    };

    if (lists && lists?.length > 0) {
      loadAllCards();
    }
  }, [lists]);

  const handleCardMove = async (
    cardId: string,
    sourceListId: string,
    targetListId: string,
  ) => {
    try {
      // Find the card in the source list
      const sourceCards = listCards[sourceListId] || [];
      const cardIndex = sourceCards.findIndex((card) => card.id === cardId);

      if (cardIndex === -1) {
        console.error("Card not found in source list");
        return;
      }

      // Get the card and update its listId
      const card = sourceCards[cardIndex];
      const updatedCard = { ...card, listId: targetListId };

      // Update the database
      await editCardListId(cardId, targetListId);

      // Update local state
      setListCards((prev) => {
        const newState = { ...prev };

        // Remove from source list
        newState[sourceListId] = sourceCards.filter((c) => c.id !== cardId);

        // Add to target list
        newState[targetListId] = [
          ...(newState[targetListId] || []),
          updatedCard,
        ];

        return newState;
      });
    } catch (error) {
      showToast("error", "Failed to move card");
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col">
      <section className="border-muted font-secondary text-foreground flex items-center gap-4 border-b p-4 text-lg font-semibold">
        <Button variant="icon" className="group border-0 p-0">
          <HiArrowLeft
            onClick={() => goBack()}
            className="group-hover:fill-primary"
            size={16}
          />
        </Button>
        {board.name}
      </section>

      <section className="flex grow gap-3 overflow-x-auto p-4">
        {board?.lists && board?.lists?.length > 0 ? (
          <>
            {lists?.map((list) => (
              <SingleBoardList
                key={list.id}
                list={list}
                cards={listCards[list.id] || []}
                onCardMove={handleCardMove}
              />
            ))}
            {isAddingList ? (
              <InlineInput
                placeholder="Enter list name..."
                onSave={handleAddList}
                onCancel={handleCancel}
                className="min-h-20 min-w-72"
                buttonText="list"
              />
            ) : (
              <Button
                onClick={() => setIsAddingList(true)}
                className="bg-primary/40 text-foreground hover:bg-primary/50 flex h-fit min-w-72 items-center justify-center border-0"
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
