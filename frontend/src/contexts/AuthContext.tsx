import { PropsWithChildren, createContext, useState } from "react";
import { TCredentials } from "../types/auth";
import { IUser } from "../types/models";
import { useMutation } from "react-query";
import { loginUser } from "../api/auth";
import { AxiosError } from "axios";

type TAPIErrorResponse = {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
  trace?: string; // Making this optional in case it's not always present
};

type TLoginResult = {
  success: boolean;
  error?: string;
};

interface IAuthContext {
  user: IUser | undefined;
  login: (credentials: TCredentials) => Promise<TLoginResult>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      const token = data.token;
      localStorage.setItem("token", token);

      setUser({ id: 1, username: "test", firstname: "", lastname: "", email: "", role: "USER" });
    },
    onError: (error) => {
      throw error;
    },
  });

  const login = async (credentials: TCredentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<TAPIErrorResponse>;
      console.log(axiosError);
      return {
        success: false,
        error: axiosError.response?.data.message || "An error occurred",
      };
    }
  };
  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
