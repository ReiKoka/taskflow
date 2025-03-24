import { HiChartBar } from "react-icons/hi2";
import Textarea from "../../ui/Textarea";
import { getInitials } from "../../../utils/helpers";
import {
  AuthenticatedUser,
  CardType,
  CommentType,
  CommentWithUserType,
} from "../../../utils/types";
import { useState } from "react";
import SingleCardComment from "./SingleCardComment";
import { nanoid } from "nanoid";
import { createComment } from "../../../services/comments";
import { showToast } from "../../../utils/showToast";

type CardActivityProps = {
  comments: CommentWithUserType[];
  setComments: React.Dispatch<React.SetStateAction<CommentWithUserType[] | undefined>>;
  user: AuthenticatedUser;
  card: CardType;
};

function CardActivity({ comments, setComments, user, card }: CardActivityProps) {
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!content) return;
    try {
      const newComment: CommentType = {
        id: nanoid(),
        cardId: card?.id,
        userId: user?.id,
        content,
        createdAt: new Date().toString(),
      };
      await createComment(newComment);
      setComments((prevComments) => [
        ...(prevComments || []),
        { ...newComment, user: { ...user, password: "" } },
      ]);
      showToast("success", "New comment added successfully!");
      setContent("");
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to create new comment!");
    }
  };

  return (
    <div className="flex flex-col items-start gap-4 px-2 py-2">
      <div className="flex items-center gap-4">
        <HiChartBar size={22} className="fill-muted-foreground" />
        <p className="font-secondary text-base font-medium">Activity</p>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-start gap-4">
          <p className="bg-primary text-primary-foreground flex aspect-square w-9 items-center justify-center rounded-full text-xs font-medium tracking-wide capitalize">
            <span> {getInitials([user?.firstName as string, user?.lastName as string])}</span>
          </p>
          <Textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-8"
            onSave={handleSave}
          />
        </div>
        <div className="mt-3 flex w-full flex-col gap-4">
          {comments?.map((comment) => (
            <SingleCardComment key={comment.id} comment={comment} user={user} setComments={setComments} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardActivity;
