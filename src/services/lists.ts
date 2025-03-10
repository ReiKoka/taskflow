import axios from "axios";
import { ListType, ListWithCardsType } from "../utils/types";
import { baseURL } from "../utils/constants";

//prettier-ignore
export const getSingleListWithGoals = async (listId: string): Promise<ListWithCardsType> => {
  try {
    const response = await axios.get<ListWithCardsType>(`${baseURL}/lists/${listId}?_embed=cards`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `${error.response?.data}, Failed to get your lists. Please try again later!`,
      );
    }
    throw new Error("Network error. Please try again.");
  }
}

//prettier-ignore
export const createList = async (newList: ListType): Promise<ListType> => {
  try {
    const response = await axios.post<ListType>(`${baseURL}/lists`, newList);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to create list. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
}

//prettier-ignore
export const editList = async (id:string, updatedList: ListType): Promise<ListType> => {
  try {
    const response = await axios.put<ListType>(`${baseURL}/lists/${id}`, updatedList);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to update list. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
};

//prettier-ignore
export const deleteList = async (id:string): Promise<ListType> => {
  try {
    const response = await axios.delete<ListType>(`${baseURL}/lists/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to delete list. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
}
