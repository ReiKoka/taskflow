import { getInitials } from "../../../utils/helpers";
import { AuthenticatedUser, CommentsWithUserType } from "../../../utils/types";

type SingleCartCommentProps = {
  comment: CommentsWithUserType;
  user: AuthenticatedUser;
};

function SingleCardComment({ comment, user }: SingleCartCommentProps) {
  return (
    <div className="flex w-full items-start gap-4">
      <p
        className={`${comment.userId === user.id ? "bg-primary" : "bg-muted-foreground"} text-primary-foreground flex aspect-square w-9 items-center justify-center rounded-full text-xs font-medium tracking-wide capitalize`}
      >
        <span>
          {getInitials([comment.user?.firstName as string, comment.user?.lastName as string])}
        </span>
      </p>
      <p className="border-secondary dark:border-muted bg-secondary dark:bg-muted w-full rounded-lg border px-2 py-1.5 text-sm">
        {comment.content}
      </p>
    </div>
  );
}

export default SingleCardComment;
