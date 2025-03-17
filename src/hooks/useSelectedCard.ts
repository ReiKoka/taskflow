import { useState } from "react";
import { CardType } from "../utils/types";
import useModal from "./useModal";

function useSelectedCard() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const { openModal } = useModal();

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
    openModal(`editCard-${card.id}`);
  };

  return { selectedCard, setSelectedCard, handleCardClick };
}

export default useSelectedCard;
