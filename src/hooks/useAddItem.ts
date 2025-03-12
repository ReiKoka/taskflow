import { useState } from "react";
import { nanoid } from "nanoid";
import { showToast } from "../utils/showToast";

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

  const handleAdd = async (value: string): Promise<T | void> => {
    setIsAdding(false);

    const newItem = {
      id: nanoid(15),
      ...additionalData,
      [nameField]: value,
    } as T;

    setItems((prevItems) => (prevItems ? [...prevItems, newItem] : [newItem]));

    try {
      const data = await createFn(newItem);
      const itemType = nameField === "title" ? "card" : "list";
      showToast("success", `New ${itemType} "${value}" added successfully`);
      return data;
    } catch (error) {
      setItems((prevItems) =>
        prevItems ? prevItems.filter((item) => item.id !== newItem.id) : [],
      );
      showToast(
        "error",
        `Failed to add ${nameField === "title" ? "card" : "list"}`,
      );
      console.error("Error adding item:", error);
    }
    return;
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
