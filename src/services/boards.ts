import axios from "axios";
import { baseURL } from "../utils/constants";
import { BoardType, BoardWithListsType } from "../utils/types";

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

//prettier-ignore
export const createBoard = async (board: BoardType): Promise<BoardType> => {
  try {
    const response = await axios.post<BoardType>(`${baseURL}/boards`, board);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to create new board. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
}

//prettier-ignore
export const editBoard = async (id:string, updatedBoard: BoardType): Promise<BoardType> => {
  try {
    const response = await axios.put<BoardType>(`${baseURL}/boards/${id}`, updatedBoard);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to update board. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
};

// //prettier-ignore
// export const deleteWorkspace = async (id:string): Promise<WorkspaceType> => {
//   try {
//     const response = await axios.delete<WorkspaceType>(`${baseURL}/workspaces/${id}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       throw new Error(`${error.response?.data}, Failed to delete workspace. Please try again later!`);
//     }
//     throw new Error("Network error. Please try again.");
//   }
// }
