import { baseURL } from "../utils/constants";

import {
  FormLoginType,
  FormRegisterType,
  UserResponseType,
} from "../utils/types";
import axios from "axios";

export const login = async (user: FormLoginType): Promise<UserResponseType> => {
  try {
    const response = await axios.post<UserResponseType>(
      `${baseURL}/login`,
      user,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Login failed.");
    }
    throw new Error("Network error. Please try again.");
  }
};

export const register = async (
  user: FormRegisterType,
): Promise<UserResponseType> => {
  try {
    console.log("Starting registration with:", user);
    const response = await axios.post<UserResponseType>(
      `${baseURL}/register`,
      user,
    );
    
    console.log("Registration response:", response);
    return response.data;
  } catch (error) {
    console.error("Registration error details:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || "Registration Failed");
    }
    throw new Error("Network error. Please try again.");
  }
};