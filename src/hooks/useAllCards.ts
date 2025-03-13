import { useState, useEffect } from "react";
import { getCards } from "../services/cards";
import { CardType, ListType } from "../utils/types";

export function useAllCards(lists: ListType[] | undefined) {
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

  return { allCards, setAllCards };
}
