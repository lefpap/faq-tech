import { IUser } from "../types/models";
import axios from "./index";

export const getUser = async (): Promise<IUser> => {
  try {
    const response = await axios.get<IUser>("/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (): Promise<void> => {
  try {
    await axios.delete<void>("/users/me");
  } catch (error) {
    throw error;
  }
};
