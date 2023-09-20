export type TCredentials = {
  username: string;
  password: string;
};

export type TRegister = {
  credentials: TCredentials;
  email: string;
  firstname: string;
  lastname: string;
  simplePushKey?: string;
};

export interface IJwtToken {
  sub: string;
  iat: number;
  exp: number;
  role: string;
  id: number;
}
