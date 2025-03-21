import { HiCheck } from "react-icons/hi2";
import useChangeStatus from "../../../hooks/useChangeStatus";
import { CardType, ListType } from "../../../utils/types";
import Select from "../../ui/Select";
import { useState } from "react";
import { editCardProperty } from "../../../services/cards";
import { showToast } from "../../../utils/showToast";

type CardHeaderProps = {
  card: CardType;
  updateCards?: ((updatedCard: CardType) => void) | undefined;
  lists: ListType[];
};

function CardHeader({ card, updateCards, lists }: CardHeaderProps) {
  const { status, handleStatusChange } = useChangeStatus(card, updateCards);
  const [selectedList, setSelectedList] = useState(card.listId);
  const selectOptions = lists.map((list) => ({ value: list.id, textValue: list.name }));

  const handleListChange = async () => {
    if (card.listId === selectedList) return;
    try {
      const cardWithNewList = await editCardProperty(card.id, { listId: selectedList });
      updateCards?.(cardWithNewList);
      showToast(
        "success",
        `Card ${card.title} was successfully transferred to list ${lists.find((list) => list.id === selectedList)?.name}`,
      );
    } catch (error) {
      console.error(error);
      showToast(
        "error",
        `Failed to transfer card ${card.title} to list ${lists.find((list) => list.id === selectedList)?.name}`,
      );
    }
  };

  return (
    <div>
      <div className="group/card font-secondary flex w-full max-w-full cursor-pointer items-center gap-4 px-2 py-2">
        <div
          tabIndex={1}
          onClick={handleStatusChange}
          className={`ring-offset-muted border-border flex aspect-square h-5 w-5 cursor-pointer items-center justify-center rounded-full border opacity-100 ring-green-400 ring-offset-2 transition-all duration-300 ease-in group-hover/card:ease-out focus-visible:ring focus-visible:outline-0 ${
            status === "completed" &&
            "border-green-500 bg-green-500 dark:border-green-700 dark:bg-green-700 dark:ring-green-700"
          }`}
        >
          <HiCheck
            size={12}
            strokeWidth={2}
            className={`stroke-background dark:stroke-secondary-foreground animate-duration-500 transition-all ${
              status === "completed"
                ? "animate-jump-in animate-once animate-ease-out opacity-100"
                : "animate-once animate-ease-out animate-jump-out"
            }`}
          />
        </div>
        <h2
          className={`max-w-[345px] text-base font-semibold break-words text-ellipsis whitespace-normal capitalize transition-transform duration-300 ease-in group-hover/card:translate-x-0 group-hover/card:ease-out`}
        >
          {card?.title}
        </h2>
      </div>

      <div className="ml-11 flex items-end gap-2.5">
        <p className="font-secondary text-foreground py-0.5 text-sm">In list </p>
        <Select
          id="list"
          options={selectOptions}
          placeholderSelected=""
          label=""
          className="bg-muted dark:bg-muted w-full min-w-34 rounded-md border-0 py-0.5 pr-0 pl-3 text-sm"
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          onBlur={handleListChange}
        />
      </div>
    </div>
  );
}

export default CardHeader;
