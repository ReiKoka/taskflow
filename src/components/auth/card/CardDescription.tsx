import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import Textarea from "../../ui/Textarea";
import { useState } from "react";

type CardDescriptionProps = {};

function CardDescription({}: CardDescriptionProps) {
  const [description, setDescription] = useState("");

  return (
    <div className="flex flex-col items-start gap-4 px-2 py-2">
      <div className="flex items-center gap-4">
        <HiChatBubbleBottomCenterText size={22} className="fill-muted-foreground" />
        <p className="font-secondary text-base font-medium">Description</p>
      </div>
      <Textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a short description..."
        className="ml-9 min-h-34 w-[calc(100%-36px)]"
      />
    </div>
  );
}

export default CardDescription;
