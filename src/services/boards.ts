import axios from "axios";
import { baseURL } from "../utils/constants";
import { BoardWithListsType } from "../utils/types";

export const getBoardById = async (
  boardId: string,
): Promise<BoardWithListsType> => {
  try {
    const response = await axios.get<BoardWithListsType>(
      `${baseURL}/boards/${boardId}?_embed=lists`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `${error.response?.data}, Failed to get your workspaces. Please try again later!`,
      );
    }
    throw new Error("Network error. Please try again.");
  }
};
