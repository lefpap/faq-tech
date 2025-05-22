import { decodeToken } from "react-jwt";
import { IJwtToken } from "../types/auth";

export const extractToken = (jwt: string) => {
  return decodeToken<IJwtToken>(jwt);
};

export const isTokenExpired = (jwt: string) => {
  const token = extractToken(jwt);

  if (!token) {
    return true;
  }

  return Date.now() / 1000 >= token.exp;
};

export const isTokenValid = (jwt: string | null) => {
  if (!jwt) return false;

  return !isTokenExpired(jwt);
};
