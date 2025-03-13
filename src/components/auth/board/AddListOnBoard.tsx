// AddListButton.tsx
import { HiPlus } from "react-icons/hi2";
import Button from "../../ui/Button";
import InlineInput from "../../ui/InlineInput";
import { ListType } from "../../../utils/types";

type AddListOnBoardProps = {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  handleAddList: (value: string) => Promise<void>;
  handleCancel: () => void;
};

//prettier-ignore
function AddListOnBoard({ isAdding, setIsAdding, handleAddList, handleCancel}: AddListOnBoardProps) {
  return isAdding ? (
    <InlineInput
      placeholder="Enter list name..."
      onSave={handleAddList}
      onCancel={handleCancel}
      className="min-h-20 min-w-72"
      buttonText="list"
    />
  ) : (
    <Button
      onClick={() => setIsAdding(true)}
      className="bg-primary/40 text-foreground hover:bg-primary/50 flex h-fit min-w-72 items-center justify-center border-0"
    >
      <HiPlus strokeWidth={1} />
      <span>Add another list</span>
    </Button>
  );
}

export default AddListOnBoard;
