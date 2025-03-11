import { useState } from "react";
import { CardStatusType, CardType } from "../../../utils/types";
import { HiCheck } from "react-icons/hi2";
import { editCardStatus } from "../../../services/cards";

type SingleCardProps = {
  item: CardType;
};

function SingleCard({ item }: SingleCardProps) {
  const [status, setStatus] = useState<CardStatusType>(item.status);

  const handleStatusChange = async () => {
    const newStatus: CardStatusType =
      status === "completed" ? "in-complete" : "completed";

    setStatus(newStatus);

    await editCardStatus(item.id, newStatus);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="group bg-muted flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-lg px-3 py-2">
        <div
          tabIndex={1}
          onClick={handleStatusChange}
          className={`flex h-4 w-4 -translate-x-4 cursor-pointer items-center justify-center rounded-full opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:opacity-100 group-hover:ease-out ${
            status === "completed"
              ? "ring-offset-muted bg-green-500 ring-green-400 ring-offset-2 focus-visible:ring focus-visible:outline-0 dark:bg-green-700 dark:ring-green-700"
              : "border-border border"
          }`}
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
        <p className="-translate-x-4 text-xs font-medium transition-transform duration-300 ease-in group-hover:translate-x-0 group-hover:ease-out">
          {item?.title}
        </p>
      </div>
    </div>
  );
}

export default SingleCard;
