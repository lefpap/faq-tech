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

const tokenFromLocalStorage = localStorage.getItem("token");
const decodedToken = tokenFromLocalStorage ? extractToken(tokenFromLocalStorage) : null;

const initialState = {
  user: decodedToken
    ? {
        id: decodedToken.id,
        username: decodedToken.sub,
        role: decodedToken.role,
      }
    : null,
  token: decodedToken
    ? {
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      }
    : null,
  isAuthenticated: !!decodedToken && isTokenValid(tokenFromLocalStorage),
};

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
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
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ ...state, login, logout, register }}>{children}</AuthContext.Provider>;
};
