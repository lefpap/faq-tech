import { TCredentials } from "../types/auth";
import axios from "./index";

export const loginUser = async (credentials: TCredentials) => {
  const { username, password } = credentials;
  try {
    const response = await axios.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
