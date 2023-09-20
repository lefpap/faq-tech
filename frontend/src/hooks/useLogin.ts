// hooks/useLogin.ts
import { useMutation } from "react-query";
import { loginUser } from "../api/auth";

type TCredentials = {
  username: string;
  password: string;
};

export const useLogin = () => {
  return useMutation((credentials: TCredentials) => loginUser(credentials));
};
