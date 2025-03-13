type UseListDragDropProps = {
  listId: string;
  onCardMove: (
    cardId: string,
    sourceListId: string,
    targetListId: string,
  ) => void;
};

export function useDragDrop({ listId, onCardMove }: UseListDragDropProps) {
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = e.dataTransfer.getData("sourceListId");

    if (sourceListId !== listId) {
      onCardMove(cardId, sourceListId, listId);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return { handleDrop, handleDragOver };
}
