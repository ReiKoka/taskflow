import axios from "axios";
import { baseURL } from "../utils/constants";
import { WorkspaceType, WorkspaceWithBoardsType } from "../utils/types";

//prettier-ignore
export const getWorkspacesOfAdmin = async (adminId: string): Promise<WorkspaceType[]> => {
  try {
    const response = await axios.get<WorkspaceType[]>(`${baseURL}/workspaces?userId=${adminId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error?.message}`);
    }
    throw error;
  }
};

//prettier-ignore

export const getWorkspacesWhereUserIsGuest = async (adminId: string): Promise<WorkspaceType[]> => {
  try {
    const response = await axios.get<WorkspaceType[]>(
      `${baseURL}/workspaces?members_like=${adminId}`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error?.message}`);
    }
    throw error;
  }
};

//prettier-ignore
export const getSingleWorkspaceWithBoards = async (workspaceId: string): Promise<WorkspaceWithBoardsType> => {
  try {
    const response = await axios.get<WorkspaceWithBoardsType>(
      `${baseURL}/workspaces/${workspaceId}?_embed=boards`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error?.message}`);
    }
    throw error;
  }
};

//prettier-ignore
export const createWorkspace = async (workspace: WorkspaceType): Promise<WorkspaceType> => {
  try {
    const response = await axios.post<WorkspaceType>(`${baseURL}/workspaces`, workspace);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}`);
    }
    throw error;
  }
};

//prettier-ignore
export const editWorkspace = async ( id: string, updatedWorkspace: WorkspaceType): Promise<WorkspaceType> => {
  try {
    const response = await axios.put<WorkspaceType>(
      `${baseURL}/workspaces/${id}`,
      updatedWorkspace,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error?.message}`);
    }
    throw error;
  }
};

//prettier-ignore
export const deleteWorkspace = async (id: string): Promise<WorkspaceType> => {
  try {
    const response = await axios.delete<WorkspaceType>(`${baseURL}/workspaces/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error?.message}`);
    }
    throw error;
  }
};
