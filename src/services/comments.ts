import axios from "axios";
import { CommentsType, CommentsWithUserType } from "../utils/types";
import { baseURL } from "../utils/constants";

export const getCommentsOfCard = async (cardId: string): Promise<CommentsWithUserType[]> => {
  try {
    const response = await axios.get<CommentsWithUserType[]>(
      `${baseURL}/comments/?_expand=user&cardId=${cardId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `${error.response?.data}, Failed to get comments belonging to card "#${cardId}". Please try again later!`,
      );
    }
    throw new Error("Network error. Please try again.");
  }
};

export const createComment = async (newComment: CommentsType): Promise<CommentsType> => {
  try {
    const response = await axios.post<CommentsType>(`${baseURL}/comments`, newComment);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to create new comment`);
    }
    throw new Error("Network error. Please try again.");
  }
};
