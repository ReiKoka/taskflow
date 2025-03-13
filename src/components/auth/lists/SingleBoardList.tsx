import { CardType, ListType } from "../../../utils/types";
import { useAddItem } from "../../../hooks/useAddItem";
import { createCard } from "../../../services/cards";
import SingleCard from "../boards/SingleCard";
import useAuth from "../../../hooks/useAuth";
import AddCardOnList from "./AddCardOnList";
import { useDragDrop } from "../../../hooks/useDragDrop";

//prettier-ignore
type SingleBoardListProps = {
  list: ListType;
  cards: CardType[];
  onCardMove: (cardId: string, sourceListId: string, targetListId: string) => void;
  setAllCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

//prettier-ignore
function SingleBoardList({ list, cards, onCardMove, setAllCards}: SingleBoardListProps) {
  const { id: listId } = list;
  const {user} = useAuth() 

  const { isAdding, setIsAdding, handleAdd, handleCancel } = useAddItem<CardType>(
      undefined,
      createCard,
      {
        listId,
        description: "",
        userId: user?.id,
        status: "in-complete",
      },
      "title",
    );
  
  const { handleDrop, handleDragOver } = useDragDrop({ listId, onCardMove});

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

      <AddCardOnList isAdding={isAdding} setIsAdding={setIsAdding} handleAddCard={handleAddWithParentUpdate} handleCancel={handleCancel}  />
    </div>
  );
}

export default SingleBoardList;
