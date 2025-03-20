import { useEffect, useState } from "react";
import { CardStatusType, CardType } from "../utils/types";
import { editCardStatus } from "../services/cards";

function useChangeStatus(
  card: CardType,
  updateCards: ((updatedCard: CardType) => void) | undefined,
) {
  const [status, setStatus] = useState<CardStatusType>(card.status);

  useEffect(() => {
    setStatus(card.status);
  }, [card.status]);

  const handleStatusChange = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    const newStatus: CardStatusType =
      status === "completed" ? "in-complete" : "completed";
    setStatus(newStatus);
    const updatedCard = { ...card, status: newStatus };

    if (updateCards) {
      updateCards(updatedCard);
    }

    try {
      await editCardStatus(card.id, newStatus);
    } catch (error) {
      console.error("Failed to update card status:", error);

      setStatus(card.status);
      if (updateCards) {
        updateCards(card);
      }
    }
  };

  return { status, setStatus, handleStatusChange };
}

export default useChangeStatus;
