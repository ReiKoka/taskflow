import { getInitials } from "../../../utils/helpers";
import { AuthenticatedUser, CommentsWithUserType } from "../../../utils/types";
import Button from "../../ui/Button";

type SingleCartCommentProps = {
  comment: CommentsWithUserType;
  user: AuthenticatedUser;
};

function SingleCardComment({ comment, user }: SingleCartCommentProps) {
  return (
    <div className="flex w-full items-start gap-4">
      <p
        className={`${comment.userId === user.id ? "bg-primary" : "bg-muted-foreground"} text-primary-foreground flex aspect-square h-9 min-h-9 w-9 min-w-9 items-center justify-center rounded-full text-xs font-medium tracking-wide capitalize`}
      >
        <span>
          {getInitials([comment.user?.firstName as string, comment.user?.lastName as string])}
        </span>
      </p>
      <div className="flex flex-col grow h-full max-h-full gap-1">
        <p className="border-secondary dark:border-muted bg-secondary dark:bg-muted w-full max-w-[320px] rounded-lg border px-2 py-1.5 text-sm break-words text-ellipsis whitespace-normal">
          {comment.content}
        </p>
        {comment.userId === user.id && (
          <div className="ml-0.5 flex items-center gap-4">
            <Button className="bg-background text-foreground rounded-none border-0 px-0 py-0 text-xs font-medium underline-offset-2 hover:scale-100 hover:underline active:scale-100">
              Edit
            </Button>
            <Button className="bg-background text-destructive rounded-none border-0 px-0 py-0 text-xs font-medium underline-offset-2 hover:scale-100 hover:underline active:scale-100">
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleCardComment;
