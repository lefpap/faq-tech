import { PropsWithChildren, createContext, useState } from "react";
import { TCredentials } from "../types/auth";
import { useMutation } from "react-query";
import { loginUser, registerUser } from "../api/auth";
import { extractToken, isTokenValid } from "../utils/auth";

interface IAuthState {
  user: { id: number; username: string; role: string } | null;
  token: { iat: number; exp: number } | null;
  isAuthenticated: boolean;
}

interface IAuthContext extends IAuthState {
  login: (credentials: TCredentials) => Promise<any>;
  register: (registerData: any) => Promise<any>;
  logout: () => void;
}

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token: null,
  isAuthenticated: isTokenValid(token),
};

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  console.log("valid token: " + isTokenValid(token));
  const [state, setState] = useState<IAuthState>(initialState);

  const loginMutation = useMutation(loginUser);
  const registerMutation = useMutation(registerUser);

  const login = async (credentials: TCredentials) => {
    try {
      const data = await loginMutation.mutateAsync(credentials);
      const decoded = extractToken(data.token);

      if (!decoded) {
        throw new Error("Invalid token");
      }

      setState({
        user: {
          id: decoded.id,
          username: decoded.sub,
          role: decoded.role,
        },
        token: {
          iat: decoded.iat,
          exp: decoded.exp,
        },
        isAuthenticated: true,
      });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (registerData: any) => {
    try {
      const data = await registerMutation.mutateAsync(registerData);
      const decoded = extractToken(data.token);
      if (!decoded) {
        throw new Error("Invalid token");
      }
      setState({
        user: {
          id: decoded.id,
          username: decoded.sub,
          role: decoded.role,
        },
        token: {
          iat: decoded.iat,
          exp: decoded.exp,
        },
        isAuthenticated: true,
      });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setState(initialState);
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ ...state, login, logout, register }}>{children}</AuthContext.Provider>;
};
