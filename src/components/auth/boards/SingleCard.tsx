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

    // Update the state
    setStatus(newStatus);

    // Use the new status value directly in the API call
    await editCardStatus(item.id, newStatus);
  };

  console.log(status);

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-muted flex w-full items-center gap-4 rounded-lg px-3 py-2">
        <div
          tabIndex={1}
          onClick={handleStatusChange}
          className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-full ${
            status === "completed"
              ? "ring-offset-muted bg-green-500 ring-green-400 ring-offset-2 focus-visible:ring focus-visible:outline-0 dark:bg-green-700 dark:ring-green-700"
              : "border-border border"
          }`}
        >
          <HiCheck
            size={10}
            strokeWidth={2}
            className={`stroke-background dark:stroke-secondary-foreground ${
              status === "completed" ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <p className="text-xs font-medium">{item?.title}</p>
      </div>
    </div>
  );
}

export default SingleCard;
