import { useState } from "react";
import { getInitials } from "../../../utils/helpers";
import { AuthenticatedUser, CommentWithUserType } from "../../../utils/types";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { editComment } from "../../../services/comments";
import { showToast } from "../../../utils/showToast";
import DropdownMenu from "../../ui/DropdownMenu";

type SingleCartCommentProps = {
  comment: CommentWithUserType;
  user: AuthenticatedUser;
};

function SingleCardComment({ comment, user }: SingleCartCommentProps) {
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isTextareaOpen, setIsTextareaOpen] = useState(false);
  const [isDeleteBoxOpen, setIsDeleteBoxOpen] = useState(false);

  const handleEditClick = () => {
    setIsTextareaOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteBoxOpen(true);
  };

  const handleSave = async () => {
    if (!commentContent) return;
    try {
      await editComment(comment.id, commentContent);
      showToast("success", `Comment successfully edited`);
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to edit comment");
    }
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

        {comment.userId === user.id && (
          <>
            <div className="ml-0.5 flex items-center gap-4">
              <Button
                className="text-foreground rounded-none border-0 bg-transparent px-0 py-0 text-xs font-medium underline-offset-2 hover:scale-100 hover:underline active:scale-100"
                onClick={handleEditClick}
              >
                Edit
              </Button>

              <Button
                className="text-destructive rounded-none border-0 bg-transparent px-0 py-0 text-xs font-medium underline-offset-2 hover:scale-100 hover:underline active:scale-100"
                onClick={handleDeleteClick}
              >
                Delete
              </Button>
            </div>
            <DropdownMenu
              isOpen={isDeleteBoxOpen}
              setIsOpen={setIsDeleteBoxOpen}
              position="top-0 left-22"
              className="relative p-4"
            >
              <h1 className="font-secondary mb-6 text-center font-medium">Delete Comment?</h1>
              <p className="font-secondary font-base max-w-72 text-center text-sm">
                Deleting a comment is forever. There is no undo.
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <Button variant="outline" className="flex-1/2 justify-center text-xs">
                  Cancel
                </Button>
                <Button variant="destructive" className="flex-1/2 justify-center text-xs">
                  Delete comment
                </Button>
              </div>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleCardComment;
