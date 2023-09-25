export type TCredentials = {
  username: string;
  password: string;
};

export interface IUpdateUserInfo {
  currentPassword: string;
  newPassword?: string;
  newUsername?: string;
  newEmail?: string;
  newFirstname?: string;
  newLastname?: string;
  newSimplePushKey?: string;
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
