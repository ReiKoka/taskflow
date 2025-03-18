import axios from "axios";
import { User } from "../utils/types";
import { baseURL } from "../utils/constants";

//prettier-ignore
export const getAllUsersOfWorkspace = async (users: string[]): Promise<User[]> => {
  try {
    const requests = users.map((userId) =>
      axios.get<User>(`${baseURL}/users/${userId}`),
    );
    const responses = await Promise.all(requests);
    return responses.map((res) => res.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `${error.response?.data}, Failed to get all users of the workspace. Please try again later!`,
      );
    }
    throw new Error("Network error. Please try again.");
  }
};
