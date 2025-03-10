import { HiPlus } from "react-icons/hi2";
import { ListType } from "../../../utils/types";
import Button from "../../ui/Button";

type SingleBoardListProps = {
  list: ListType;
};

function SingleBoardList({ list }: SingleBoardListProps) {
  
  const handleClick = () => {
    console.log("test");
  };

  return (
    <div className="bg-secondary font-secondary flex h-fit min-h-24 max-w-72 min-w-72 flex-col rounded-xl p-3">
      <p className="text-sm font-medium">{list.name}</p>
      <Button
        variant="default"
        className="text-foreground hover:bg-muted mt-auto border-0 bg-transparent px-2 py-1 hover:scale-100"
        onClick={handleClick}
      >
        <HiPlus />
        <span>Add a card</span>
      </Button>
    </div>
  );
}

export default SingleBoardList;
