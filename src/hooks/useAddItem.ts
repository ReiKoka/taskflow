import { useState } from "react";
import { nanoid } from "nanoid";

type Item = {
  id: string;
};

export function useAddItem<T extends Item>(
  initialItems: T[] | undefined,
  createFn: (data: T) => Promise<T>,
  additionalData: Partial<T> = {},
  nameField: keyof T = "name" as keyof T,
) {
  const [items, setItems] = useState<T[] | undefined>(initialItems);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (value: string) => {
    setIsAdding(false);

    const newItem = {
      id: nanoid(15),
      ...additionalData,
      [nameField]: value,
    } as T;

    setItems((prevItems) => (prevItems ? [...prevItems, newItem] : [newItem]));
    await createFn(newItem);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  return {
    items,
    setItems,
    isAdding,
    setIsAdding,
    handleAdd,
    handleCancel,
  };
}
