import { editCardListId } from "../services/cards";
import { showToast } from "../utils/showToast";
import { CardType } from "../utils/types";

export function useCardMovement(
  allCards: CardType[],
  setAllCards: React.Dispatch<React.SetStateAction<CardType[]>>,
) {
  //prettier-ignore
  const handleCardMove = async (cardId: string,sourceListId: string,targetListId: string) => {
    const cardToMove = allCards.find((card) => card.id === cardId);
    if (!cardToMove) return;

    if (sourceListId === targetListId) return;
      
    const updatedCard = { ...cardToMove, listId: targetListId };

    // Removing and adding it again in order to put it in the end of the array everytime a card is moved.
    const filteredCards = allCards.filter((card) => card.id !== cardId);
    const newCards = [...filteredCards, updatedCard];

    setAllCards(newCards);

    try {
      await editCardListId(cardId, targetListId);
    } catch (error) {
      console.log(error);

      const revertedCard = { ...cardToMove, listId: sourceListId };
      setAllCards((prevCards) =>
        prevCards.map((card) => (card.id === cardId ? revertedCard : card)),
      );
      showToast("error", `Failed to move card`);
    }
  };

  return { handleCardMove };
}
