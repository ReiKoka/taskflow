import { HiChartBar } from "react-icons/hi2";
import Textarea from "../../ui/Textarea";
import { getInitials } from "../../../utils/helpers";
import { AuthenticatedUser, CommentsWithUserType } from "../../../utils/types";
import { useState } from "react";

type CardActivityProps = {
  comments: CommentsWithUserType[];
  setComments: React.Dispatch<React.SetStateAction<CommentsWithUserType[] | undefined>>;
  user: AuthenticatedUser;
};

function CardActivity({ comments, setComments, user }: CardActivityProps) {
  const [content, setContent] = useState("");
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
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          {comments?.map((comment) => <p>{comment.content}</p>)}
        </div>
      </div>
    </div>
  );
}

export default CardActivity;
