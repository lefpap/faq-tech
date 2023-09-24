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

interface IUserInfo {
  firstname: string;
  lastname: string;
  simplePushKey?: string;
}

export const updateUserInfo = async (request: IUserInfo): Promise<number> => {
  try {
    const response = await axios.put("/users/me", request);
    return response.status;
  } catch (error) {
    throw error;
  }
};
