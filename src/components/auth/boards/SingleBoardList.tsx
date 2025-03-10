import { HiPlus } from "react-icons/hi2";
import { CardType, ListType } from "../../../utils/types";
import Button from "../../ui/Button";
import { useAddItem } from "../../../hooks/useAddItem";
import { use, useEffect, useState } from "react";

import { createCard, getCards } from "../../../services/cards";
import InlineInput from "../../ui/InlineInput";
import { AuthContext } from "../../../context/AuthContext";

type SingleBoardListProps = {
  list: ListType;
};

function SingleBoardList({ list }: SingleBoardListProps) {
  const { id: listId } = list;
  const authContext = use(AuthContext);
  const user = authContext?.user;
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    async function loadCards() {
      try {
        const fetchedCards = await getCards(listId);
        setCards(fetchedCards);
      } catch (error) {
        console.error(`Failed to fetch cards for list ${listId}:`, error);
      }
    }

    loadCards();
  }, [listId]);

  const { items, setItems, isAdding, setIsAdding, handleAdd, handleCancel } =
    useAddItem<CardType>(
      cards,
      createCard,
      {
        listId,
        description: "",
        userId: user?.id,
      },
      "title",
    );

  useEffect(() => {
    setItems(cards);
  }, [cards, setItems]);

  return (
    <div className="bg-secondary font-secondary flex h-fit min-h-24 max-w-72 min-w-72 flex-col rounded-xl p-3">
      <p className="text-sm font-medium">{list?.name}</p>
      <div className="flex flex-col gap-2">
        {items?.map((item) => <div key={item.id}>{item?.title}</div>)}
      </div>
      {isAdding ? (
        <InlineInput
          placeholder="Enter card name..."
          onSave={handleAdd}
          onCancel={handleCancel}
        />
      ) : (
        <Button
          variant="default"
          className="text-foreground hover:bg-muted mt-auto border-0 bg-transparent px-2 py-1 hover:scale-100"
          onClick={() => setIsAdding(true)}
        >
          <HiPlus />
          <span>Add a card</span>
        </Button>
      )}
    </div>
  );
}

export default SingleBoardList;
