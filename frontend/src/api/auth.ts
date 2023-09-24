import { ICredentialsChange, TCredentials, TRegister } from "../types/auth";
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

export const registerUser = async (userInfo: TRegister) => {
  const { credentials, firstname, lastname, email, simplePushKey } = userInfo;
  try {
    const response = await axios.post("/auth/register", {
      username: credentials.username,
      password: credentials.password,
      firstname,
      lastname,
      email,
      simplePushKey,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeCredentials = async (credentials: ICredentialsChange) => {
  try {
    console.log("On change credentials: ", localStorage.getItem("token"));
    const response = await axios.put("/auth/update", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
