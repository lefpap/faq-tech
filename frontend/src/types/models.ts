export interface IUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  simplePushKey?: string;
}

export interface IAnswer {
  id: number;
  text: string;
  createdAt: string;
  user: IUser;
}

export interface IQuestion {
  id: number;
  title: string;
  text: string;
  user: IUser;
  answers: IAnswer[] | number;
  createdAt: string;
}
