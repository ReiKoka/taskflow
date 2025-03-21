import Modal from "../../ui/Modal";
import useModal from "../../../hooks/useModal";
import { AuthenticatedUser, CardType, CommentsWithUserType, ListType } from "../../../utils/types";
import CardHeader from "../card/CardHeader";
import CardDescription from "../card/CardDescription";
import { useEffect, useState } from "react";
import { getCommentsOfCard } from "../../../services/comments";
import { showToast } from "../../../utils/showToast";
import useAuth from "../../../hooks/useAuth";
import CardActivity from "../card/CardActivity";
import Loader from "../../ui/Loader";

type SingleCardModalProps = {
  title: string;
  card: CardType;
  modalType: `editCard-${string}`;
  updateCards?: ((updatedCard: CardType) => void) | undefined;
  onClose: () => void;
  lists: ListType[];
};

function SingleCardModal({
  card,
  title,
  modalType,
  onClose,
  updateCards,
  lists,
}: SingleCardModalProps) {
  const { activeModal } = useModal();
  const isOpen = activeModal === modalType;
  if (!isOpen) return null;

  const [comments, setComments] = useState<CommentsWithUserType[] | undefined>(undefined);
  const { user } = useAuth();


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsOfCard(card.id);
        setComments(commentsData);
      } catch (error) {
        console.error(error);
        showToast("error", "Failed to get comments of card");
      }
    };
    fetchComments();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {!user || !comments ? (
        <Loader />
      ) : (
        <section className="text-foreground flex flex-col gap-4">
          <CardHeader card={card} updateCards={updateCards} lists={lists} />
          <CardDescription />
          <CardActivity
            user={user as AuthenticatedUser}
            comments={comments as CommentsWithUserType[]}
            setComments={setComments}
          />
        </section>
      )}
    </Modal>
  );
}

export default SingleCardModal;
