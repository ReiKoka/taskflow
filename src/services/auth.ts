import { baseURL } from "../utils/constants";

import { FormLoginType, User, UserResponseType } from "../utils/types";
import axios from "axios";

export const login = async (user: FormLoginType): Promise<UserResponseType> => {
  try {
    const response = await axios.post<UserResponseType>(
      `${baseURL}/login`,
      user,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`${error.response?.data}. Please check your credentials`);
    }
    throw new Error("Network error. Please try again.");
  }
};

export const register = async (user: User): Promise<UserResponseType> => {
  try {
    const response = await axios.post<UserResponseType>(
      `${baseURL}/register`,
      user,
    );

    return response.data;
  } catch (error) {
    console.error("Registration error details:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Registration Failed");
    }
    throw new Error("Network error. Please try again.");
  }
};
