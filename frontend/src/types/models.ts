export interface IUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
}

export interface IQuestion {
  id: number;
  title: string;
  text: string;
  user: IUser;
  createdAt: string;
}
