import { useRef, useState } from "react";
import { CardStatusType, CardType } from "../../../utils/types";
import { HiCheck } from "react-icons/hi2";
import { editCardStatus } from "../../../services/cards";

type SingleCardProps = {
  item: CardType;
};

function SingleCard({ item }: SingleCardProps) {
  const [status, setStatus] = useState<CardStatusType>(item.status);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("cardId", item.id);
    e.dataTransfer.setData("sourceListId", item.listId);
  };

  const handleStatusChange = async () => {
    const newStatus: CardStatusType =
      status === "completed" ? "in-complete" : "completed";
    setStatus(newStatus);
    await editCardStatus(item.id, newStatus);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className="group bg-muted flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-lg px-2 py-2"
        draggable
        onDragStart={handleDragStart}
      >
        <div
          tabIndex={1}
          onClick={handleStatusChange}
          className={`ring-offset-muted border-border flex aspect-square h-4 w-4 cursor-pointer items-center justify-center rounded-full border opacity-0 ring-green-400 ring-offset-2 transition-all duration-300 ease-in group-hover:ease-out focus-visible:ring focus-visible:outline-0 ${status === "completed" ? "border-green-500 bg-green-500 opacity-100 dark:border-green-700 dark:bg-green-700 dark:ring-green-700" : "-translate-x-4 group-hover:translate-x-0 group-hover:opacity-100"}`}
        >
          <HiCheck
            size={10}
            strokeWidth={2}
            className={`stroke-background dark:stroke-secondary-foreground transition-all duration-300 ${
              status === "completed"
                ? "animate-jump-in animate-once animate-ease-out opacity-100"
                : "opacity-0"
            }`}
          />
        </div>
        <p
          className={`max-w-full overflow-hidden text-xs font-medium break-words text-ellipsis whitespace-normal transition-transform duration-300 ease-in group-hover:translate-x-0 group-hover:ease-out ${status === "completed" ? "translate-x-0" : "-translate-x-4"}`}
        >
          {item?.title}
        </p>
      </div>
    </div>
  );
}

export default SingleCard;
