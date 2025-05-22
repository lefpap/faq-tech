import { PropsWithChildren, createContext, useState, useEffect } from "react";
import { IUpdateUserInfo, TCredentials } from "../types/auth";
import { useMutation } from "react-query";
import { updateUser, loginUser, registerUser } from "../api/auth";
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
  updateUserInfo: (request: IUpdateUserInfo) => Promise<any>;
  logout: () => void;
}

const getInitialState = () => {
  const token = localStorage.getItem("token");
  const decodedToken = token && isTokenValid(token) ? extractToken(token) : null;

  if (!decodedToken) {
    localStorage.removeItem("token");
    return {
      user: null,
      token: null,
      isAuthenticated: false,
    };
  }

  return {
    user: {
      id: decodedToken.id,
      username: decodedToken.sub,
      email: decodedToken.email,
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname,
      simplePushKey: decodedToken.simplePushKey,
      role: decodedToken.role,
    },
    token: {
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    },
    isAuthenticated: true,
  };
};

const initialState = getInitialState();

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IAuthState>(initialState);

  const loginMutation = useMutation(loginUser);
  const registerMutation = useMutation(registerUser);
  const updateUserMutation = useMutation(updateUser);

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

  const updateUserInfo = async (credentials: IUpdateUserInfo) => {
    try {
      const data = await updateUserMutation.mutateAsync(credentials);
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

  useEffect(() => {
    if (state.token && !isTokenValid(localStorage.getItem("token"))) {
      logout();
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
