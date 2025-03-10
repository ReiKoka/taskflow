import axios from "axios";
import { baseURL } from "../utils/constants";
import { CardType } from "../utils/types";

export const getCards = async (listId: string): Promise<CardType[]> => {
  try {
    const response = await axios.get<CardType[]>(
      `${baseURL}/cards/?listId=${listId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `${error.response?.data}, Failed to get cards belonging to ${listId}. Please try again later!`,
      );
    }
    throw new Error("Network error. Please try again.");
  }
};

//prettier-ignore
export const createCard = async (newCard: CardType): Promise<CardType> => {
  try {
    const response = await axios.post<CardType>(`${baseURL}/cards`, newCard);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to create card. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
}
