import { HiPlus } from "react-icons/hi2";
import Button from "../../ui/Button";
import InlineInput from "../../ui/InlineInput";

type AddCardOnListProps = {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  handleAddCard: (value: string) => Promise<void>;
  handleCancel: () => void;
};

function AddCardOnList({
  isAdding,
  setIsAdding,
  handleAddCard,
  handleCancel,
}: AddCardOnListProps) {
  return isAdding ? (
    <InlineInput
      placeholder="Enter card name..."
      onSave={handleAddCard}
      onCancel={handleCancel}
      buttonText="card"
    />
  ) : (
    <Button
      variant="default"
      className="text-foreground hover:bg-muted mt-auto mr-1.5 border-0 bg-transparent px-2.5 py-2 text-xs hover:scale-100"
      onClick={() => setIsAdding(true)}
    >
      <HiPlus size={13} />
      <span>Add a card</span>
    </Button>
  );
}

export default AddCardOnList;
