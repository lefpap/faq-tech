import { TCredentials } from "../types/auth";
import axios from "./index";

export const loginUser = async (credentials: TCredentials) => {
  const { username, password } = credentials;
  try {
    const response = await axios.post("/auth/login", {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
