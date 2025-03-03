import axios from "axios";
import { baseURL } from "../utils/constants";
import { WorkspaceType } from "../utils/types"

export const getWorkspacesOfAdmin = async (adminId: string): Promise<WorkspaceType[]> => {
  try {
    const response = await axios.get<WorkspaceType[]>(`${baseURL}/workspaces?userId=${adminId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to get your workspaces. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
}

export const createWorkspace = async (workspace: WorkspaceType): Promise<WorkspaceType> => {
  try {
    const response = await axios.post<WorkspaceType>(`${baseURL}/workspaces`, workspace);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}, Failed to create workspace. Please try again later!`);
    }
    throw new Error("Network error. Please try again.");
  }
}