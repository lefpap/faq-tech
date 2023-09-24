import { PropsWithChildren, createContext, useState } from "react";
import { ICredentialsChange, TCredentials } from "../types/auth";
import { useMutation } from "react-query";
import { changeCredentials, loginUser, registerUser } from "../api/auth";
import { extractToken, isTokenValid } from "../utils/auth";
import { IUser } from "../types/models";

interface IAuthState {
  user: IUser | null;
  token: { iat: number; exp: number } | null;
  isAuthenticated: boolean;
}

interface IAuthContext extends IAuthState {
  login: (credentials: TCredentials) => Promise<any>;
  register: (registerData: any) => Promise<any>;
  credentialsChange: (credentials: any) => Promise<any>;
  logout: () => void;
}

const token = localStorage.getItem("token");
const decodedToken = token && isTokenValid(token) ? extractToken(token) : null;
const initialState = {
  user: decodedToken
    ? {
        id: decodedToken.id,
        username: decodedToken.sub,
        email: decodedToken.email,
        firstname: decodedToken.firstname,
        lastname: decodedToken.lastname,
        simplePushKey: decodedToken.simplePushKey,
        role: decodedToken.role,
      }
    : null,
  token: decodedToken
    ? {
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      }
    : null,
  isAuthenticated: !!decodedToken && isTokenValid(token),
};

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IAuthState>(initialState);

  const loginMutation = useMutation(loginUser);
  const registerMutation = useMutation(registerUser);
  const changeCrdentialsMutation = useMutation(changeCredentials);

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
          email: decoded.email,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          simplePushKey: decoded.simplePushKey,
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
          email: decoded.email,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          simplePushKey: decoded.simplePushKey,
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

  const credentialsChange = async (credentials: ICredentialsChange) => {
    try {
      const data = await changeCrdentialsMutation.mutateAsync(credentials);
      const decoded = extractToken(data.token);

      if (!decoded) {
        throw new Error("Invalid token");
      }

      setState({
        user: {
          id: decoded.id,
          username: decoded.sub,
          email: decoded.email,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          simplePushKey: decoded.simplePushKey,
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
      console.error("Credentials change failed:", error);
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

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, credentialsChange }}>
      {children}
    </AuthContext.Provider>
  );
};
