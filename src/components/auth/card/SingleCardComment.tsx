import { useState } from "react";
import { getInitials } from "../../../utils/helpers";
import { AuthenticatedUser, CommentsWithUserType } from "../../../utils/types";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";

type SingleCartCommentProps = {
  comment: CommentsWithUserType;
  user: AuthenticatedUser;
};

function SingleCardComment({ comment, user }: SingleCartCommentProps) {
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isTextareaOpen, setIsTextareaOpen] = useState(false);

  const handleEditClick = () => {
    setIsTextareaOpen(true);
  };

  const handleSave = async () => {
    setIsTextareaOpen(false);
  };

  return (
    <div className="flex w-full items-start gap-4">
      <p
        className={`${
          comment.userId === user.id ? "bg-primary" : "bg-muted-foreground"
        } text-primary-foreground flex aspect-square h-9 min-h-9 w-9 min-w-9 items-center justify-center rounded-full text-xs font-medium tracking-wide capitalize`}
      >
        <span>
          {getInitials([comment.user?.firstName as string, comment.user?.lastName as string])}
        </span>
      </p>
      <div className="flex h-full max-h-full grow flex-col gap-1">
        {!isTextareaOpen ? (
          <p className="border-secondary dark:border-muted bg-secondary dark:bg-muted w-full max-w-[450px] rounded-lg border px-2 py-1.5 text-sm break-words text-ellipsis whitespace-normal">
            {commentContent}
          </p>
        ) : (
          <Textarea
            id={`comment-${comment.id}`}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Type something..."
            setIsOpen={setIsTextareaOpen}
            onSave={handleSave}
            
          />
        )}

        <div className="ml-0.5 flex items-center gap-4">
          <Button
            className="bg-background text-foreground rounded-none border-0 px-0 py-0 text-xs font-medium underline-offset-2 hover:scale-100 hover:underline active:scale-100"
            onClick={handleEditClick}
          >
            Edit
          </Button>

          <Button className="bg-background text-destructive rounded-none border-0 px-0 py-0 text-xs font-medium underline-offset-2 hover:scale-100 hover:underline active:scale-100">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleCardComment;
