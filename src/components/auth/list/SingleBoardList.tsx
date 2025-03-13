import { CardType, ListType } from "../../../utils/types";
import { useAddItem } from "../../../hooks/useAddItem";
import { createCard } from "../../../services/cards";
import SingleCard from "./SingleCard";
import useAuth from "../../../hooks/useAuth";
import AddCardOnList from "./AddCardOnList";
import { useDragDrop } from "../../../hooks/useDragDrop";
import { useState } from "react";
import { showToast } from "../../../utils/showToast";
import { editList } from "../../../services/lists";

//prettier-ignore
type SingleBoardListProps = {
  list: ListType;
  setItems: React.Dispatch<React.SetStateAction<ListType[] | undefined>>
  cards: CardType[];
  onCardMove: (cardId: string, sourceListId: string, targetListId: string) => void;
  setAllCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  onEditStateChange?: (listId: string, isEditing: boolean) => void;
};

//prettier-ignore
function SingleBoardList({ list, setItems, cards, onCardMove, setAllCards, onEditStateChange}: SingleBoardListProps) {
  const { id: listId } = list;
  const {user} = useAuth() 
  const [listName, setListName] = useState<string>(list.name)

  const handleFocus = () => {
    onEditStateChange?.(list.id, true);
  };
  
  const onBlurHandle = () => {
    onEditStateChange?.(list.id, false);
    if (listName !== list.name) {
      const newList = {...list, name: listName}; 
      setItems(prevItems => 
        prevItems?.map(item => item.id === list.id ? newList : item)
      );
      editList(list.id, newList);
      showToast("success", `List name changed successfully`);
    }
  }
  

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
      className="bg-secondary font-secondary flex max-h-full overflow-y-auto min-h-24 max-w-72 min-w-72 flex-col rounded-xl pl-3 py-3 pr-1.5"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input 
        value={listName} 
        onChange={(e) => setListName(e.target.value)} 
        onBlur={onBlurHandle} 
        onFocus={handleFocus}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur(); 
          }
        }}
        className="ring-offset-muted border-0 flex items-center justify-center ring-primary min-w-20 w-[50%] mb-4 duration-300 ease-in focus-visible:ring-2 focus-visible:outline-0 opacity-100 text-sm font-semibold focus:outline-0 focus:p-2 transition-all rounded-lg " />  
      <div className="mb-2 flex flex-col gap-2 flex-1 overflow-y-auto pr-1.5" >
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
