import { HiPlus } from "react-icons/hi2";
import { CardType, ListType } from "../../../utils/types";
import Button from "../../ui/Button";
import { useAddItem } from "../../../hooks/useAddItem";
import { use } from "react";

import { createCard } from "../../../services/cards";
import InlineInput from "../../ui/InlineInput";
import { AuthContext } from "../../../context/AuthContext";
import SingleCard from "./SingleCard";

//prettier-ignore
type SingleBoardListProps = {
  list: ListType;
  cards: CardType[];
  onCardMove: (cardId: string, sourceListId: string, targetListId: string) => void;
  setAllCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

function SingleBoardList({
  list,
  cards,
  onCardMove,
  setAllCards,
}: SingleBoardListProps) {
  const { id: listId } = list;
  const authContext = use(AuthContext);
  const user = authContext?.user;

  // Only use the hook for adding new cards, not for managing existing ones
  const { isAdding, setIsAdding, handleAdd, handleCancel } =
    useAddItem<CardType>(
      [], // Start with empty array
      createCard,
      {
        listId,
        description: "",
        userId: user?.id,
        status: "in-complete",
      },
      "title",
    );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = e.dataTransfer.getData("sourceListId");

    if (sourceListId !== listId) {
      onCardMove(cardId, sourceListId, listId);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAddWithParentUpdate = async (value: string) => {
    const newCard = await handleAdd(value);

    if (newCard) {
      setAllCards((prevCards) => [...prevCards, newCard]);
    }
  };

  return (
    <div
      className="bg-secondary font-secondary flex h-fit min-h-24 max-w-72 min-w-72 flex-col rounded-xl p-3"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p className="mb-4 text-sm font-semibold">{list?.name}</p>
      <div className="mb-2 flex flex-col gap-2">
        {cards?.map((card) => (
          <SingleCard
            key={card.id}
            item={card}
            updateCards={(updatedCard) => {
              setAllCards((prevCards) =>
                prevCards.map((c) =>
                  c.id === updatedCard.id ? updatedCard : c,
                ),
              );
            }}
          />
        ))}
      </div>
      {isAdding ? (
        <InlineInput
          placeholder="Enter card name..."
          onSave={handleAddWithParentUpdate}
          onCancel={handleCancel}
          buttonText="card"
        />
      ) : (
        <Button
          variant="default"
          className="text-foreground hover:bg-muted mt-auto border-0 bg-transparent px-2.5 py-2 text-xs hover:scale-100"
          onClick={() => setIsAdding(true)}
        >
          <HiPlus size={13} />
          <span>Add a card</span>
        </Button>
      )}
    </div>
  );
}

export default SingleBoardList;
