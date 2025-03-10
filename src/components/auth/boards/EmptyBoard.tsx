import { HiPlus } from "react-icons/hi2";
import NoLists from "../../../assets/images/no-lists.svg?react";
import Button from "../../ui/Button";

function EmptyBoard() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <NoLists className="h-fit w-40" />
      <h2 className="text-center font-medium text-balance">
        You don't have any lists on this board. Time to create one? 🤔
      </h2>
      <Button className="border-muted dark:text-foreground bg-muted-foreground text-muted dark:bg-muted h-fit font-medium">
        <HiPlus strokeWidth={2} />
        <span>Create first list</span>
      </Button>
    </div>
  );
}

export default EmptyBoard;
