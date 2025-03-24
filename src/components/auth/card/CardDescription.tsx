import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import Textarea from "../../ui/Textarea";
import { CardType } from "../../../utils/types";
import { useState } from "react";
import { editCardProperty } from "../../../services/cards";
import { showToast } from "../../../utils/showToast";

type CardDescriptionProps = {
  card: CardType;
  updateCards: ((updatedCard: CardType) => void) | undefined;
};

function CardDescription({ card, updateCards }: CardDescriptionProps) {
  const [description, setDescription] = useState(card?.description);
  const [isTextareaOpen, setIsTextareaOpen] = useState(description ? false : true);

  const handleSave = async () => {
    try {
      const cardWithNewDescription = await editCardProperty(card.id, { description });
      if (updateCards) {
        updateCards(cardWithNewDescription);
      }
      showToast("success", `Card description updated successfully!`);
    } catch (error) {
      console.error(error);
      showToast("error", `Failed edit description`);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 px-2 py-2">
      <div className="flex items-center gap-4">
        <HiChatBubbleBottomCenterText size={22} className="fill-muted-foreground" />
        <p className="font-secondary text-base font-medium">Description</p>
      </div>
      {isTextareaOpen ? (
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description..."
          className="ml-9 min-h-34 w-[calc(100%-36px)]"
          setIsOpen={setIsTextareaOpen}
          onSave={handleSave}
        />
      ) : (
        description && (
          <p
            className="font-secondary ml-10 w-[calc(100%-36px)] cursor-pointer text-sm"
            onClick={() => setIsTextareaOpen(true)}
          >
            {description}
          </p>
        )
      )}
    </div>
  );
}

export default CardDescription;
