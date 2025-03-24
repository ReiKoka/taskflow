import axios from "axios";
import { CommentType, CommentWithUserType } from "../utils/types";
import { baseURL } from "../utils/constants";

export const getCommentsOfCard = async (cardId: string): Promise<CommentWithUserType[]> => {
  try {
    const response = await axios.get<CommentWithUserType[]>(
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

export const createComment = async (newComment: CommentType): Promise<CommentType> => {
  try {
    const response = await axios.post<CommentType>(`${baseURL}/comments`, newComment);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to create new comment`);
    }
    throw new Error("Network error. Please try again.");
  }
};

//prettier-ignore
export const editComment = async ( commentId: string, content: string): Promise<CommentType> => {
  try {
    const response = await axios.patch<CommentType>(`${baseURL}/comments/${commentId}`, {content});
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to edit comment`);
    }
    throw new Error("Network error. Please try again.");
  }
};
