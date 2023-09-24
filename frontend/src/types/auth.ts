export type TCredentials = {
  username: string;
  password: string;
};

export interface ICredentialsChange {
  currentPassword: string;
  newPassword?: string;
  newUsername?: string;
  newEmail?: string;
}

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
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  simplePushKey?: string;
  role: string;
}
