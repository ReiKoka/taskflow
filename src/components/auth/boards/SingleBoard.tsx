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

  const {
    items: lists,
    isAdding: isAddingList,
    setIsAdding: setIsAddingList,
    handleAdd: handleAddList,
    handleCancel,
  } = useAddItem<ListType>(board.lists || [], createList, {
    boardId: board.id,
  });

  const [allCards, setAllCards] = useState<CardType[]>([]);

  useEffect(() => {
    const loadAllCards = async () => {
      let loadedCards: CardType[] = [];
      if (lists) {
        for (const list of lists) {
          try {
            const listCards = await getCards(list.id);
            loadedCards = [...loadedCards, ...listCards];
          } catch (error) {
            console.error(`Failed to fetch cards for list ${list.id}:`, error);
          }
        }

        setAllCards(loadedCards);
      }
    };

    if (lists && lists.length > 0) {
      loadAllCards();
    }
  }, [lists]);

  //prettier-ignore
  const handleCardMove = async (cardId: string, sourceListId: string, targetListId: string) => {

    // Finding the card on the allCards array
    const cardIndex = allCards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return;

    // Updating the card
    const updatedCard = {...allCards[cardIndex], listId: targetListId};
    
    setAllCards(cards => [...cards.slice(0, cardIndex), updatedCard, ...cards.slice(cardIndex + 1)]);

    // Updating the database
    try {
      await editCardListId(cardId, targetListId)

    } catch (error) {
      console.log(error)
      const revertedCard = {...updatedCard, listId: sourceListId};
      setAllCards(cards => [
        ...cards.slice(0, cardIndex),
        revertedCard,
        ...cards.slice(cardIndex + 1)
      ]);
      showToast('error', `Failed to move card`)
    }
  }

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
                cards={allCards?.filter((card) => card.listId === list.id)}
                setAllCards={setAllCards}
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
